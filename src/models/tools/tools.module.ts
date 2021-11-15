import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolsRepository } from './tools.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ToolsRepository])],
  providers: [ToolsService],
  exports: [ToolsService],
})
export class ToolsModule {}
