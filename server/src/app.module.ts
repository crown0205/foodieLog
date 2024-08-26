import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // NOTE : ConfigModule을 사용하여 환경변수를 설정한다.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hyeonsujeong',
      password: 'postgres',
      database: 'foodielog-app',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    PostModule,
    AuthModule,
    ImageModule,
  ],
  controllers: [],
  providers: [ConfigModule], // NOTE : ConfigModule을 providers에 추가하면 다른 모듈에서 ConfigService를 주입받을 수 있다.
})
export class AppModule {}
