import { ApiBody, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
import { ITool } from './interfaces/tools.interface';
import {
  defaultToolGroupsForSerializing,
  ToolEntity,
} from './serializers/tools.serializer';
import { Tool } from './entities/tools.entity';
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tool: {
          type: 'string',
        },
        label: {
          type: 'string',
        },
        icon: {
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
  async create(@Body() body: ITool): Promise<ToolEntity> {
    return this.toolsService.create(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(): Promise<Tool[]> {
    return this.toolsService.getAll();
  }

  @ApiBearerAuth()
  @Delete(':tool')
  @ApiQuery({ name: 'tool', type: 'string' })
  @UserTypes('admin')
  async delete(@Query('tool') tool: string): Promise<boolean> {
    return this.toolsService.delete(tool);
  }
}
