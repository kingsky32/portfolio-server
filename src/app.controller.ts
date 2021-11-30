import { UpdateUserDto } from './models/users/dtos/users.dto';
import { UsersService } from '#models/users/users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Req,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import {
  extendedUserGroupsForSerializing,
  UserEntity,
} from './models/users/serializers/users.serializer';

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
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: UserEntity })
  getProfile(@Req() req): Promise<UserEntity | null> {
    return req.user;
  }

  @ApiBearerAuth()
  @Put('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
