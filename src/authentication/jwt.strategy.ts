import { UsersService } from '#models/users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfigService } from '#config/authentication/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfigService.access_token_secret,
      signOptions: {
        expriesIn: authConfigService.access_token_expiration_time,
      },
    });
  }

  async validate(payload: any) {
    return this.usersService.get(payload.sub);
  }
}
