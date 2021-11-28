import { UsersService } from '#models/users/users.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from '#common/guards/jwt-auth.guard';
import { extendedUserGroupsForSerializing } from './models/users/serializers/users.serializer';

@Controller()
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Req() req) {
    const user = this.usersService.get(
      req.user.id,
      ['profile', 'userType'],
      true,
    );
    return user;
  }
}
