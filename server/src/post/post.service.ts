import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { MarkerColor } from './marker-color.enum';
import { Post } from './post.entity';

// NOTE : 각 컨트롤러 매서드에 따라 해당하는 DB 작업등의 로직이 들어간다.

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getPosts(page: number) {
    const perPage = 10;
    const offset = (page - 1) * perPage;

    console.log({ page, offset });

    return this.postRepository
      .createQueryBuilder('post') // Note : post라는 별칭을 사용한다
      .orderBy('post.date', 'DESC') // Note : post.date를 기준으로 내림차순 정렬한다.
      .take(perPage) // Note : perPage만큼 가져온다.
      .skip(offset) // Note : offset만큼 건너뛴다.
      .getMany(); // Note : 결과를 배열로 반환한다.
  }

  async getPostById(id: number) {
    try {
      const foundPost = await this.postRepository
        .createQueryBuilder('post') // Note: post라는 별칭을 사용한다.
        .where('post.id = :id', { id }) // Note: id가 일치하는 post를 찾는다.
        .getOne(); // Note: 결과를 반환한다.

      if (!foundPost) {
        throw new NotFoundException('해당하는 게시물이 없습니다.'); // Note: NotFoundException는 404 에러를 의미하고, 해당하는 게시물이 없다는 메시지를 반환한다.
      }

      return foundPost;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '게시물을 불러오는 도중 에러가 발생했어요.',
      );
    }
  }

  async createPost(createPostDto: CreatePostDto) {
    const {
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      score,
      imageUrls,
    } = createPostDto;

    const post = this.postRepository.create({
      latitude,
      longitude,
      color,
      address,
      title,
      description,
      date,
      score,
    });

    try {
      await this.postRepository.save(post);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 추가하는 도중 에러가 발생했어요.',
      );
    }

    return post;
  }
}
