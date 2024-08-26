import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { MarkerColor } from 'src/post/marker-color.enum';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // note : getTokens 함수는 사용자의 이메일을 받아서 accessToken과 refreshToken을 반환하는 함수이다.
  private async getTokens(payload: { email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  // note : updateHashedRefreshToken 함수는 사용자의 id와 refreshToken을 받아서 해당 사용자의 hashedRefreshToken을 업데이트하는 함수이다.
  private async updateHashedRefreshToken(id: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    try {
      await this.userRepository.update(id, {
        hashedRefreshToken,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '리프레시 토큰 업데이트 도중 에러가 발생했습니다.',
      );
    }
  }

  async signup(authDto: AuthDto) {
    const { email, password } = authDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      loginType: 'email',
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }

      throw new InternalServerErrorException(
        '회원가입 도중 에거가 발생했습니다.',
      );
    }

    return { message: '회원가입 성공' };
  }

  async signin(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.userRepository.findOneBy({ email }); // note : fineOneBy의 역활은 DB에서 해당하는 데이터를 찾아오는 역활을 한다.

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const { accessToken, refreshToken } = await this.getTokens({ email });
    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  // note : refreshToken 함수는 사용자의 정보를 받아서 refreshToken을 업데이트하고 새로운 accessToken과 refreshToken을 반환하는 함수이다.
  async refreshToken(user: User) {
    const { email } = user;
    const { accessToken, refreshToken } = await this.getTokens({ email });

    if (!user.hashedRefreshToken) {
      throw new ForbiddenException();
    }

    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async deleteRefreshToken(user: User) {
    try {
      await this.userRepository.update(user.id, { hashedRefreshToken: null });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '로그아웃 도중 에러가 발생했습니다.',
      );
    }
  }

  // note : getProfile 함수는 사용자의 정보를 받아서 password와 hashedRefreshToken을 제외한 정보를 반환하는 함수이다.
  getProfile(user: User) {
    const { password, hashedRefreshToken, ...rest } = user;

    return { ...rest };
  }

  async editProfile(editProfileDto: EditProfileDto, user: User) {
    const profile = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: user.id })
      .getOne();

    if (!profile) {
      throw new NotFoundException('프로필을 찾을 수 없습니다.');
    }

    if (user.nickname === editProfileDto.nickname) {
      throw new BadRequestException('이미 사용중인 닉네임입니다.');
    }

    const { nickname, imageUrl } = editProfileDto;
    profile.nickname = nickname;
    profile.imageUrl = imageUrl;

    try {
      await this.userRepository.save(profile);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '프로필 업데이트 도중 에러가 발생했습니다.',
      );
    }

    return { message: '프로필 업데이트 성공' };
  }

  async deleteAccount(user: User) {
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .delete()
        .from(User)
        .where('id = :id', { id: user.id })
        .execute(); // NOTE : execute() 함수를 호출해야 실제로 쿼리가 실행된다.
    } catch (error) {
      console.log(error);
      throw new BadRequestException('계정 삭제 도중 에러가 발생했습니다.');
    }

    return { message: '계정 삭제 성공' };
  }

  async updateCategory(
    categories: Record<keyof MarkerColor, string>,
    user: User,
  ) {
    const { BLUE, GREEN, PURPLE, RED, YELLOW } = MarkerColor;

    if (
      !Object.keys(categories).every((color: MarkerColor) =>
        [RED, YELLOW, GREEN, BLUE, PURPLE].includes(color),
      )
    ) {
      throw new BadRequestException('유효하지 않은 카테고리입니다.');
    }

    user[RED] = categories[RED];
    user[YELLOW] = categories[YELLOW];
    user[BLUE] = categories[BLUE];
    user[GREEN] = categories[GREEN];
    user[PURPLE] = categories[PURPLE];

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '카테고리 업데이트 도중 에러가 발생했습니다.',
      );
    }

    const { password, hashedRefreshToken, ...rest } = user;

    return { ...rest };
  }
}
