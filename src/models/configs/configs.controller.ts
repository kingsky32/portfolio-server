import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigsService } from './configs.service';
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
  ConfigEntity,
  defaultConfigGroupsForSerializing,
} from './serializers/configs.serializer';
import { UserTypes } from '#common/decorators/metadata/user-types.decorator';

@ApiTags('configs')
@Controller('configs')
@SerializeOptions({
  groups: defaultConfigGroupsForSerializing,
})
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @ApiBearerAuth()
  @Post()
  @UserTypes('ADMIN')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ConfigEntity,
  })
  async create(@Body() configEntity: ConfigEntity): Promise<ConfigEntity> {
    return this.configsService.create(configEntity);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({ type: [ConfigEntity] })
  async getAll(): Promise<ConfigEntity[]> {
    return this.configsService.getAll();
  }

  @ApiBearerAuth()
  @Delete(':config')
  @ApiQuery({ name: 'config', type: 'string' })
  @UserTypes('ADMIN')
  @ApiOkResponse({ type: Boolean })
  async delete(@Query('config') config: string): Promise<boolean> {
    return this.configsService.delete(config);
  }
}
