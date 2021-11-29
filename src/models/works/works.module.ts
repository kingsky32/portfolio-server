import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorksRepository } from './works.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorksRepository])],
  providers: [WorksService],
  exports: [WorksService],
})
export class WorksModule {}
