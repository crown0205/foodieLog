import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { MarkerColor } from 'src/post/marker-color.enum';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  @Patch('/logout')
  @UseGuards(AuthGuard())
  logout(@GetUser() user: User) {
    return this.authService.deleteRefreshToken(user);
  }

  @Get('/refresh')
  @UseGuards(AuthGuard()) // NOTE : 인증된 사용자만 접근 가능하도록 설정한다.
  refresh(user: User) {
    return this.authService.refreshToken(user);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User) {
    return this, this.authService.getProfile(user);
  }

  @Patch('/me')
  @UseGuards(AuthGuard())
  editProfile(@Body() editProfileDto: EditProfileDto, @GetUser() user: User) {
    return this, this.authService.editProfile(editProfileDto, user);
  }

  @Delete('/me')
  @UseGuards(AuthGuard())
  deleteAccount(@GetUser() user: User) {
    return this, this.authService.deleteAccount(user);
  }

  @Patch('/category')
  @UseGuards(AuthGuard())
  updateCategory(
    @Body() categories: Record<keyof MarkerColor, string>,
    @GetUser() user: User,
  ) {
    return this.authService.updateCategory(categories, user);
  }

  @Post('/oauth/kakao')
  kakaoLogin(@Body() kakaoToken: { token: string }) {
    return this.authService.kakaoLogin(kakaoToken);
  }

  @Post('/oauth/apple')
  appleLogin(
    @Body()
    appleIdentity: {
      identityToken: string;
      appId: string;
      nickname: string;
    },
  ) {
    return this.authService.appleLogin(appleIdentity);
  }
}
