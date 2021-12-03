import { Expose } from 'class-transformer';
import { IUser } from '../interfaces/users.interface';
import { ModelEntity } from '#common/serializers/model.serializer';
import { File } from '#models/files/entities/files.entity';
import { UserType } from '#models/user-types/entities/user-types.entity';
import { ApiProperty } from '@nestjs/swagger';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];

export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
  'user.account_access_fail_count',
];
export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];

export class UserEntity extends ModelEntity implements IUser {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  username: string;

  @Expose({ groups: ['user.password'] })
  password: string;

  @ApiProperty({ type: () => File })
  profile: File;

  @ApiProperty({ type: () => UserType })
  userType: UserType;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @Expose({ groups: ['user.account_access_fail_count'] })
  accountAccessFailCount: number;

  @ApiProperty({ type: Date })
  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
