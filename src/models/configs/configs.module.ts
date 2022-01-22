import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsRepository } from './configs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigsRepository])],
  providers: [ConfigsService],
  exports: [ConfigsService],
})
export class ConfigsModule {}
