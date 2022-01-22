import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { LogsService } from './logs.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import {
  defaultLogGroupsForSerializing,
  LogEntity,
} from './serializers/logs.serializer';
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
  @UserTypes('ADMIN')
  @ApiOkResponse({ type: [LogEntity] })
  async getAll(): Promise<LogEntity[]> {
    return this.toolsService.getAll();
  }
}
