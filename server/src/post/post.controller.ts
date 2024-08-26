import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

// NOTE : 요청을 처리하고 응답을 리턴하는 역할을 한다.

@Controller()
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/markers')
  getAllMarkers(@GetUser() user: User) {
    return this.postService.getAllMarkers(user);
  }

  @Get('/posts')
  getPosts(@Query('page') page: number, @GetUser() user: User) {
    return this.postService.getPosts(page, user);
  }

  @Get('/posts/:id')
  getPostById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.postService.getPostById(id, user);
  }

  @Post('/posts')
  @UsePipes(ValidationPipe) // NOTE : ValidationPipe는 요청의 유효성을 검사하는 파이프이다.
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    console.log({ createPostDto });
    return this.postService.createPost(createPostDto, user);
  }

  @Patch('/posts/:id')
  @UsePipes(ValidationPipe)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>,
    @GetUser() user: User,
  ) {
    return this.postService.updatePost(id, updatePostDto, user);
  }

  @Delete('/posts/:id')
  deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.postService.deletePost(id, user);
  }
}
