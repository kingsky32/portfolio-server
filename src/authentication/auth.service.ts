import { User } from '#models/users/entities/users.entity';
import { UsersService } from '#models/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from '#config/authentication/config.service';

export type ValidateUserType =
  | Omit<User, 'password' | 'accountAccessFailCount'>
  | Error;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authConfigService: AuthConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ValidateUserType> {
    return await this.usersService.login(username, password);
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.authConfigService.refresh_token_secret,
        expiresIn: `${this.authConfigService.refresh_token_expiration_time}s`,
      }),
    };
  }
}
