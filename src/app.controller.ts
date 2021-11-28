import { User } from '#models/users/entities/users.entity';
import { UsersService } from '#models/users/users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
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
  getProfile(@Req() req): Promise<User | null> {
    const user = this.usersService.get(
      req.user.id,
      ['profile', 'userType'],
      true,
    );
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profile: { type: 'string' },
      },
    },
  })
  async update(@Req() req, @Body() body): Promise<User | null> {
    return this.usersService.update(req.user.id, body);
  }
}
