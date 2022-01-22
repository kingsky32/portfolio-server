import {
  ApiQuery,
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ToolsService } from './tools.service';
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
  defaultToolGroupsForSerializing,
  ToolEntity,
} from './serializers/tools.serializer';
import { UserTypes } from '#common/decorators/metadata/user-types.decorator';

@ApiTags('tools')
@Controller('tools')
@SerializeOptions({
  groups: defaultToolGroupsForSerializing,
})
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @ApiBearerAuth()
  @Post()
  @UserTypes('ADMIN')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ToolEntity,
  })
  async create(@Body() toolEntity: ToolEntity): Promise<ToolEntity> {
    return this.toolsService.create(toolEntity);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({ type: [ToolEntity] })
  async getAll(): Promise<ToolEntity[]> {
    return this.toolsService.getAll();
  }

  @ApiBearerAuth()
  @Delete(':tool')
  @ApiQuery({ name: 'tool', type: 'string' })
  @UserTypes('ADMIN')
  @ApiOkResponse({ type: Boolean })
  async delete(@Query('tool') tool: string): Promise<boolean> {
    return this.toolsService.delete(tool);
  }
}
