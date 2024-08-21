import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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

  @Get('/posts/:id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @Post('/posts')
  @UsePipes(ValidationPipe) // NOTE : ValidationPipe는 요청의 유효성을 검사하는 파이프이다.
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log({ createPostDto });
    return this.postService.createPost(createPostDto);
  }

  @Delete('/posts/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}
