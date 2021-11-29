import { ApiBody, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WorksService } from './works.service';
import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { IWork } from './interfaces/works.interface';
import {
  defaultWorkGroupsForSerializing,
  WorkEntity,
} from './serializers/works.serializer';
import { UserTypes } from '#common/decorators/metadata/user-types.decorator';

@ApiTags('works')
@Controller('works')
@SerializeOptions({
  groups: defaultWorkGroupsForSerializing,
})
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @ApiBearerAuth()
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
        },
        platform: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        meta: {
          type: 'string',
        },
        thumbnail: {
          type: 'string',
        },
        github: {
          type: 'string',
        },
        page: {
          type: 'string',
        },
        tools: {
          type: 'json',
        },
        startAt: {
          type: 'date',
        },
        endAt: {
          type: 'date',
        },
        isActive: {
          type: 'boolean',
          default: false,
        },
      },
    },
  })
  @UserTypes('admin')
  async create(@Body() body: IWork): Promise<WorkEntity> {
    return this.worksService.create(body);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiQuery({ name: 'id', type: 'string' })
  @UserTypes('admin')
  async delete(@Query('id') id: string): Promise<boolean> {
    return this.worksService.delete(id);
  }
}
