import { HttpException, HttpStatus } from '@nestjs/common';
import { RefreshTokenEntity } from './serializers/refresh-tokens.serializer';
import { ModelRepository } from './../models/model.repository';
import { EntityRepository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { User } from '#models/users/entities/users.entity';

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends ModelRepository<
  RefreshToken,
  RefreshTokenEntity
> {
  public async createRefreshToken(
    user: User,
    ttl: number,
  ): Promise<RefreshToken> {
    if (!Boolean(user)) {
      throw new HttpException('Unregistered User', HttpStatus.UNAUTHORIZED);
    }

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    return this.createEntity({
      user,
      expires: expiration,
    });
  }
}
