import { User } from '#models/users/entities/users.entity';
import { UsersService } from '#models/users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from '#common/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

export type ValidateUserType =
  | Omit<User, 'password' | 'accountAccessFailCount'>
  | Error;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ValidateUserType> {
    const user = await this.usersService.findOne(username);

    if (!Boolean(user)) {
      throw new HttpException('Unregistered User', HttpStatus.NOT_FOUND);
    }

    const isCompare = await bcrypt.compare(password, user.password);

    if (isCompare) {
      return user;
    }

    throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
