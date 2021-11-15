import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ToolsService } from './tools.service';
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ITool } from './interfaces/tools.interface';
import { ToolEntity } from './serializers/tools.serializer';
import { Tool } from './entities/tools.entity';

@ApiTags('tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

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
  async create(@Body() body: ITool): Promise<ToolEntity> {
    return this.toolsService.create(body);
  }

  @Get()
  async findAll(): Promise<Tool[]> {
    return this.toolsService.findAll();
  }

  @Delete(':code')
  @ApiQuery({ name: 'code', type: 'string' })
  async delete(@Query('code') code: string): Promise<boolean> {
    return this.toolsService.delete(code);
  }
}
