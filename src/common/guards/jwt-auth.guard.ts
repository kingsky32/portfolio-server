import { Reflector } from '@nestjs/core';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const userType = this.reflector.get<string>(
      'user-type',
      context.getHandler(),
    );

    if (!userType) {
      return true;
    }

    return super.canActivate(context);
  }
}
