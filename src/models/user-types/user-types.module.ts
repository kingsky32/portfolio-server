import { Module } from '@nestjs/common';
import { UserTypesService } from './user-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypesRepository } from './user-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypesRepository])],
  providers: [UserTypesService],
  exports: [UserTypesService],
})
export class UserTypesModule {}
