import { PostService } from './post.service';
import { Controller, Get } from '@nestjs/common';

// NOTE : 요청을 처리하고 응답을 리턴하는 역할을 한다.

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('posts')
  getPosts() {
    return this.postService.getPosts();
  }
}
