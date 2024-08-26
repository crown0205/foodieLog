import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
