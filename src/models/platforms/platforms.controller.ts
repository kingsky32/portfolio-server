import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PlatformssService } from './platforms.service';
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
import { IPlatform } from './interfaces/platforms.interface';
import {
  PlatformEntity,
  defaultPlatformGroupsForSerializing,
} from './serializers/platforms.serializer';
import { Platform } from './entities/platforms.entity';
import { UserTypes } from '#common/decorators/metadata/user-types.decorator';

@ApiTags('platforms')
@Controller('platforms')
@SerializeOptions({
  groups: defaultPlatformGroupsForSerializing,
})
export class CodesController {
  constructor(private readonly platformsService: PlatformssService) {}

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
        isActive: {
          type: 'boolean',
          default: false,
        },
      },
    },
  })
  @UserTypes('ADMIN')
  async create(@Body() body: IPlatform): Promise<PlatformEntity> {
    return this.platformsService.create(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<Platform[]> {
    return this.platformsService.findAll();
  }

  @ApiBearerAuth()
  @Delete(':code')
  @ApiQuery({ name: 'code', type: 'string' })
  @UserTypes('ADMIN')
  async delete(@Query('code') code: string): Promise<boolean> {
    return this.platformsService.delete(code);
  }
}
