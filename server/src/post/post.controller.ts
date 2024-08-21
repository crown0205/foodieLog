import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

// NOTE : 요청을 처리하고 응답을 리턴하는 역할을 한다.

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('posts')
  getPosts(@Query('page') page: number) {
    return this.postService.getPosts(page);
  }

  @Post('/posts')
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log({ createPostDto });
    return this.postService.createPost(createPostDto);
  }
}
