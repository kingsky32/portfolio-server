import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import {
  extendedUserGroupsForSerializing,
  UserEntity,
} from './serializers/users.serializer';
import { JwtAuthGuard } from '#/common/guards/jwt-auth.guard';

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
