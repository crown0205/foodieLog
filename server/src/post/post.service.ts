import { Injectable } from '@nestjs/common';

// NOTE : 각 컨트롤러 매서드에 따라 해당하는 DB 작업등의 로직이 들어간다.

@Injectable()
export class PostService {
  async getPosts() {
    return ['post1', 'post2', 'post3'];
  }
}
