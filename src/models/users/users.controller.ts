import { PaginatedDto, PaginationDto } from '#/common/dtos/paginated.dto';
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
  defaultUserGroupsForSerializing,
  UserEntity,
} from './serializers/users.serializer';
import { CreateUserDto } from './dtos/users.dto';

@ApiTags('users')
@Controller('users')
@SerializeOptions({
  groups: defaultUserGroupsForSerializing,
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    type: PaginatedDto,
  })
  async getAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedDto<UserEntity>> {
    return this.usersService.getAll(paginationDto);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: UserEntity })
  async get(@Query('id') id: string): Promise<UserEntity> {
    return this.usersService.get(id);
  }
}
