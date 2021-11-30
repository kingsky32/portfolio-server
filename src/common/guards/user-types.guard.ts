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
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const userTypes = this.reflector.get<string[]>(
      'user-types',
      context.getHandler(),
    );
    if (!userTypes) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;

    console.log(user);

    if (!user || !user.userType) {
      throw new HttpException('Permission Denied', HttpStatus.FORBIDDEN);
    }

    return userTypes.includes(user.userType.userType);
  }
}
