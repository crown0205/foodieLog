import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';

// NOTE : PostController를 사용하기 위해 PostModule에 추가한다.

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
