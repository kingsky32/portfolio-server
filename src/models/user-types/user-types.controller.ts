import { UserTypes } from '#common/decorators/metadata/user-types.decorator';
import { ApiBody, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserTypesService } from './user-types.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { IUserType } from './interfaces/user-types.interface';
import {
  defaultUserTyperoupsForSerializing,
  UserTypeEntity,
} from './serializers/user-types.serializer';
import { UserType } from './entities/user-types.entity';

@ApiTags('user-types')
@Controller('user-types')
@SerializeOptions({
  groups: defaultUserTyperoupsForSerializing,
})
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  @ApiBearerAuth()
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
        isActive: {
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
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll(): Promise<UserType[]> {
    return this.userTypesService.getAll();
  }

  @ApiBearerAuth()
  @Delete(':type')
  @ApiQuery({ name: 'type', type: 'string' })
  @UserTypes('admin')
  async delete(@Query('type') userType: string): Promise<boolean> {
    return this.userTypesService.delete(userType);
  }
}
