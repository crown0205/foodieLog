import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';
import { Image } from 'src/image/image.entity';

// NOTE : PostController를 사용하기 위해 PostModule에 추가한다.

@Module({
  imports: [TypeOrmModule.forFeature([Post, Image]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
