import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { RefreshTokensRepository } from '#authentication/refresh-tokens.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, RefreshTokensRepository]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
