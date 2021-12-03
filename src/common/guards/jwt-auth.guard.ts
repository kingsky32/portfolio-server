import { Reflector } from '@nestjs/core';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const userTypes = this.reflector.get<string[]>(
      'user-types',
      context.getHandler(),
    );

    if (!userTypes) {
      return true;
    }

    return super.canActivate(context);
  }
}
