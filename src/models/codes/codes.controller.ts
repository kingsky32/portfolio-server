import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CodesService } from './codes.service';
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ICode } from './interfaces/codes.interface';
import { CodeEntity } from './serializers/codes.serializer';
import { Code } from './entities/codes.entity';

@ApiTags('codes')
@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

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
      },
    },
  })
  async create(@Body() body: ICode): Promise<CodeEntity> {
    return this.codesService.create(body);
  }

  @Get()
  async findAll(): Promise<Code[]> {
    return this.codesService.findAll();
  }

  @Delete(':code')
  @ApiQuery({ name: 'code', type: 'string' })
  async delete(@Query('code') code: string): Promise<boolean> {
    return this.codesService.delete(code);
  }
}
