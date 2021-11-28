import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CodesService } from './codes.service';
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
import { ICode } from './interfaces/codes.interface';
import {
  CodeEntity,
  defaultCodeGroupsForSerializing,
} from './serializers/codes.serializer';
import { Code } from './entities/codes.entity';
import { UserTypes } from '#common/decorators/metadata/user-types.decorator';

@ApiTags('codes')
@Controller('codes')
@SerializeOptions({
  groups: defaultCodeGroupsForSerializing,
})
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

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
        active: {
          type: 'boolean',
          default: false,
        },
      },
    },
  })
  @UserTypes('admin')
  async create(@Body() body: ICode): Promise<CodeEntity> {
    return this.codesService.create(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<Code[]> {
    return this.codesService.findAll();
  }

  @ApiBearerAuth()
  @Delete(':code')
  @ApiQuery({ name: 'code', type: 'string' })
  @UserTypes('admin')
  async delete(@Query('code') code: string): Promise<boolean> {
    return this.codesService.delete(code);
  }
}
