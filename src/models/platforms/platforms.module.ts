import { Module } from '@nestjs/common';
import { PlatformssService } from './platforms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformsRepository } from './platforms.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformsRepository])],
  providers: [PlatformssService],
  exports: [PlatformssService],
})
export class CodesModule {}
