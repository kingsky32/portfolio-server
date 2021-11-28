import { ApiBody, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ToolsService } from './tools.service';
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ITool } from './interfaces/tools.interface';
import { ToolEntity } from './serializers/tools.serializer';
import { Tool } from './entities/tools.entity';
import { UserTypes } from '#common/decorators/metadata/user-types.decorator';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
        },
        label: {
          type: 'string',
        },
        icon: {
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
  async create(@Body() body: ITool): Promise<ToolEntity> {
    return this.toolsService.create(body);
  }

  @Get()
  async findAll(): Promise<Tool[]> {
    return this.toolsService.findAll();
  }

  @ApiBearerAuth()
  @Delete(':code')
  @ApiQuery({ name: 'code', type: 'string' })
  @UserTypes('admin')
  async delete(@Query('code') code: string): Promise<boolean> {
    return this.toolsService.delete(code);
  }
}
