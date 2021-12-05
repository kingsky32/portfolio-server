import { PaginationDto, PaginatedDto } from './../../common/dtos/paginated.dto';
import { Work } from './entities/works.entity';
import { CreateWorkDto } from './dto/works.dto';
import {
  ApiQuery,
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { WorksService } from './works.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import {
  defaultWorkGroupsForSerializing,
  WorkEntity,
} from './serializers/works.serializer';
import { UserTypes } from '#/common/decorators/metadata/user-types.decorator';

@ApiTags('works')
@Controller('works')
@SerializeOptions({
  groups: defaultWorkGroupsForSerializing,
})
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @ApiBearerAuth()
  @Post()
  @UserTypes('USER')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Work,
  })
  async create(
    @Body() createWorkDto: CreateWorkDto,
    @Req() req,
  ): Promise<WorkEntity> {
    return this.worksService.create(createWorkDto, req.user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    type: PaginatedDto,
  })
  async getAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedDto<WorkEntity>> {
    return this.worksService.getAll(paginationDto, [
      'user',
      'platform',
      'thumbnail',
      'tools',
    ]);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    type: WorkEntity,
  })
  @ApiQuery({ name: 'id', type: 'string' })
  async get(@Query('id') id: string): Promise<WorkEntity> {
    return this.worksService.get(id, [
      'user',
      'platform',
      'thumbnail',
      'tools',
    ]);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiQuery({ name: 'id', type: 'string' })
  async delete(@Query('id') id: string, @Req() req): Promise<boolean> {
    return this.worksService.delete(id, req.user);
  }
}
