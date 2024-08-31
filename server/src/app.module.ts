import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ImageModule } from './image/image.module';
import { PostModule } from './post/post.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    PostModule,
    AuthModule,
    ImageModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [ConfigModule], // NOTE : ConfigModule을 providers에 추가하면 다른 모듈에서 ConfigService를 주입받을 수 있다.
})
export class AppModule {}
