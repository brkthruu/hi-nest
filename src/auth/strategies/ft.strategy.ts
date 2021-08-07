import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'ft') {
  constructor(configService: ConfigService) {
    super({
      authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${configService.get<string>(
        'ft.client_id',
      )}&redirect_uri=${configService.get<string>(
        'ft.callback',
      )}&response_type=code`,
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: configService.get<string>('ft.client_id'),
      clientSecret: configService.get<string>('ft.client_secret'),
      callbackURL: configService.get<string>('ft.callback'),
    });
  }

  async validate(accessToken: string, refreshToken: string) {
    try {
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  }
}
