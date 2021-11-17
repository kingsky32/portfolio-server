import { Expose } from 'class-transformer';
import { IUser } from '../interfaces/users.interface';
import { ModelEntity } from '#common/serializers/model.serializer';
import { File } from '#models/files/entities/files.entity';
import { UserType } from '#models/user-types/entities/user-types.entity';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];

export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];
export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
  'user.account_access_fail_count',
];

export class UserEntity extends ModelEntity implements IUser {
  email: string;

  username: string;

  @Expose({ groups: ['user.password'] })
  password: string;

  profile: File;

  userType: UserType;

  accountAccessFailCount: number;

  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
