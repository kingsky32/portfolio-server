import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsRepository } from './logs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogsRepository])],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
