import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
import {
  CodeEntity,
  defaultCodeGroupsForSerializing,
} from './serializers/codes.serializer';
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
  @UserTypes('ADMIN')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CodeEntity,
  })
  async create(@Body() codeEntity: CodeEntity): Promise<CodeEntity> {
    return this.codesService.create(codeEntity);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({ type: [CodeEntity] })
  async getAll(): Promise<CodeEntity[]> {
    return this.codesService.getAll();
  }

  @ApiBearerAuth()
  @Delete(':code')
  @ApiQuery({ name: 'code', type: 'string' })
  @UserTypes('ADMIN')
  @ApiOkResponse({ type: Boolean })
  async delete(@Query('code') code: string): Promise<boolean> {
    return this.codesService.delete(code);
  }
}
