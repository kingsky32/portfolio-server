import { IRefreshToken } from '../interfaces/refresh-token.interface';
import { ModelEntity } from '#common/serializers/model.serializer';
import { User } from '#models/users/entities/users.entity';

export const defaultRefreshTokenGroupsForSerializing: string[] = [
  'refresh-token.timestamps',
];

export class RefreshTokenEntity extends ModelEntity implements IRefreshToken {
  user: User;
  isRevoked: boolean;
  expires: Date;
}
