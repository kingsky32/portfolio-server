import { UserTypes } from '#common/decorators/metadata/user-types.decorator';
import {
  ApiQuery,
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
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
import {
  defaultUserTyperoupsForSerializing,
  UserTypeEntity,
} from './serializers/user-types.serializer';

@ApiTags('user-types')
@Controller('user-types')
@SerializeOptions({
  groups: defaultUserTyperoupsForSerializing,
})
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  @ApiBearerAuth()
  @Post()
  @UserTypes('ADMIN')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserTypeEntity,
  })
  async create(
    @Body() userTypeEntity: UserTypeEntity,
  ): Promise<UserTypeEntity> {
    return this.userTypesService.create(userTypeEntity);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: [UserTypeEntity] })
  async getAll(): Promise<UserTypeEntity[]> {
    return this.userTypesService.getAll();
  }

  @ApiBearerAuth()
  @Delete(':type')
  @ApiQuery({ name: 'type', type: 'string' })
  @UserTypes('ADMIN')
  @ApiOkResponse({ type: Boolean })
  async delete(@Query('type') userType: string): Promise<boolean> {
    return this.userTypesService.delete(userType);
  }
}
