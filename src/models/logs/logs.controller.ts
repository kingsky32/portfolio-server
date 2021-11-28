import { ApiTags } from '@nestjs/swagger';
import { LogsService } from './logs.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { defaultLogGroupsForSerializing } from './serializers/logs.serializer';
import { Log } from './entities/logs.entity';
import { UserTypes } from '#common/decorators/metadata/user-types.decorator';

@ApiTags('logs')
@Controller('logs')
@SerializeOptions({
  groups: defaultLogGroupsForSerializing,
})
export class LogsController {
  constructor(private readonly toolsService: LogsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UserTypes('admin')
  async getAll(): Promise<Log[]> {
    return this.toolsService.getAll();
  }
}
