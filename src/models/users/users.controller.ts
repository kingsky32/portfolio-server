import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiQuery } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import {
  extendedUserGroupsForSerializing,
  UserEntity,
} from './serializers/users.serializer';

@ApiTags('users')
@Controller('users')
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        profile: { type: 'string' },
        isActive: { type: 'boolean' },
      },
    },
  })
  async create(@Body() body: User) {
    return this.usersService.create(body);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  async get(@Query('id') id: string): Promise<UserEntity> {
    return this.usersService.get(id, ['profile', 'userType'], true);
  }
}
