import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  providers: [],
})
export class AppModule {}
