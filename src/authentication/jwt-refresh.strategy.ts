import { Injectable } from '@nestjs/common';
import { AuthConfigService } from '#config/authentication/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '#models/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.refresh_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: authConfigService.refresh_token_secret,
      signOptions: {
        expriesIn: authConfigService.refresh_token_expiration_time,
      },
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
