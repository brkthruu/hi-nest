import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { exception } from 'console';
import { Strategy } from 'passport-oauth2';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'ft') {
  constructor(private http: HttpService, configService: ConfigService) {
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
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    // HttpService 는 Observable 을 반환한다.
    const req = this.http.get('https://api.intra.42.fr/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    try {
      const { data } = await lastValueFrom(req);
      if (!data) throw new exception();
      console.log(data);
      return data;
    } catch (error) {}

    throw new UnauthorizedException();
  }
}
