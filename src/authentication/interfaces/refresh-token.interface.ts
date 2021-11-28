import { User } from '#models/users/entities/users.entity';

export interface IRefreshToken {
  id: string;
  user: User;
  isRevoked: boolean;
  expires: Date;
}
