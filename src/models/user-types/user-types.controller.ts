import { UserTypes } from './../../common/decorators/metadata/user-types.decorator';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserTypesService } from './user-types.service';
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { IUserType } from './interfaces/user-types.interface';
import { UserTypeEntity } from './serializers/user-types.serializer';
import { UserType } from './entities/user-types.entity';

@ApiTags('user-types')
@Controller('user-types')
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userType: {
          type: 'string',
        },
        label: {
          type: 'string',
        },
        active: {
          type: 'boolean',
          default: false,
        },
      },
    },
  })
  @UserTypes('admin')
  async create(@Body() body: IUserType): Promise<UserTypeEntity> {
    return this.userTypesService.create(body);
  }

  @Get()
  async findAll(): Promise<UserType[]> {
    return this.userTypesService.findAll();
  }

  @Delete(':type')
  @ApiQuery({ name: 'type', type: 'string' })
  @UserTypes('admin')
  async delete(@Query('type') userType: string): Promise<boolean> {
    return this.userTypesService.delete(userType);
  }
}