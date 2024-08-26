import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// NOTE : createParamDecorator를 사용하여 커스텀 데코레이터를 생성한다.
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  console.log('get-user.decorator.ts', { request });

  return request.user;
});
