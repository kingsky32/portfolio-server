import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesRepository } from './codes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CodesRepository])],
  providers: [CodesService],
  exports: [CodesService],
})
export class CodesModule {}
