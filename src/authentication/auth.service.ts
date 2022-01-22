import { UserEntity } from './../models/users/serializers/users.serializer';
import { User } from '#models/users/entities/users.entity';
import { UsersService } from '#models/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from '#config/authentication/config.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authConfigService: AuthConfigService,
  ) {}

  async get(id: string): Promise<UserEntity> {
    return await this.usersService.get(id);
  }

  async validateUser(username: string, password: string): Promise<UserEntity> {
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
