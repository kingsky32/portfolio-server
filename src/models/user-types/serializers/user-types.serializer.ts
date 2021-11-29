import { Expose } from 'class-transformer';
import { IUserType } from '../interfaces/user-types.interface';
import { ModelEntity } from '#common/serializers/model.serializer';

export const defaultUserTyperoupsForSerializing: string[] = [];

export class UserTypeEntity extends ModelEntity implements IUserType {
  userType: string;
  label: string;
  isActive: boolean;
  @Expose({ groups: ['user_type.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['user_type.timestamps'] })
  updatedAt: Date;
}
