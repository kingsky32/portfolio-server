import { UserTypesRepository } from './../user-types/user-types.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { RefreshTokensRepository } from '#authentication/refresh-tokens.repository';
import { ConfigsRepository } from '../configs/configs.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersRepository,
      RefreshTokensRepository,
      UserTypesRepository,
      ConfigsRepository,
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
