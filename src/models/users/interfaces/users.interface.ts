import { File } from '#models/files/entities/files.entity';
import { UserType } from '#models/user-types/entities/user-types.entity';

export interface IUser {
  email: string;
  username: string;
  password: string;
  profile: File;
  accountAccessFailCount: number;
  userType: UserType;
  isActive: boolean;
}
