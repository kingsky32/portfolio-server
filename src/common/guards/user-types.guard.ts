import { UserTypesService } from './../../models/user-types/user-types.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '#models/users/serializers/users.serializer';

@Injectable()
export class UserTypesGuard implements CanActivate {
  constructor(
    private readonly userTypesService: UserTypesService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userType = this.reflector.get<string>(
      'user-type',
      context.getHandler(),
    );
    if (!userType) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;

    const userTypeRaw = await this.userTypesService.get(userType);

    console.log(user);

    if (!user || !user.userType || userTypeRaw.level > user.userType.level) {
      throw new HttpException('Permission Denied', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
