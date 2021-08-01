import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MoviesModule, TypeOrmModule.forRoot(), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
