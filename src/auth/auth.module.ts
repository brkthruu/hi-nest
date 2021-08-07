import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './strategies/ft.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.sercret,
      signOptions: { expiresIn: '60s' },
    }),
    HttpModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, FortyTwoStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
