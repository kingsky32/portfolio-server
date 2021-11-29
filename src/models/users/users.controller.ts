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
import {
  ApiTags,
  ApiQuery,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  extendedUserGroupsForSerializing,
  UserEntity,
} from './serializers/users.serializer';
import { CreateUserDto } from './dtos/users.dto';

@ApiTags('users')
@Controller('users')
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: UserEntity })
  async get(@Query('id') id: string): Promise<UserEntity> {
    return this.usersService.get(id, ['profile', 'userType'], true);
  }
}
