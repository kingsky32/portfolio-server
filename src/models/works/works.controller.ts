import { Work } from './entities/works.entity';
import { CreateWorkDto } from './dto/works.dto';
import {
  ApiQuery,
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { WorksService } from './works.service';
import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  SerializeOptions,
} from '@nestjs/common';
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
  @UserTypes('admin')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Work,
  })
  async create(@Body() createWorkDto: CreateWorkDto): Promise<WorkEntity> {
    return this.worksService.create(createWorkDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiQuery({ name: 'id', type: 'string' })
  @UserTypes('admin')
  async delete(@Query('id') id: string): Promise<boolean> {
    return this.worksService.delete(id);
  }
}
