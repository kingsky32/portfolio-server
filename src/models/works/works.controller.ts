import { JwtAuthGuard } from '#common/guards/jwt-auth.guard';
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
  Req,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import {
  defaultWorkGroupsForSerializing,
  WorkEntity,
} from './serializers/works.serializer';

@ApiTags('works')
@Controller('works')
@SerializeOptions({
  groups: defaultWorkGroupsForSerializing,
})
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiQuery({ name: 'id', type: 'string' })
  async delete(@Query('id') id: string, @Req() req): Promise<boolean> {
    return this.worksService.delete(id, req.user);
  }
}
