import { Expose } from 'class-transformer';
import { IUserType } from '../interfaces/user-types.interface';
import { ModelEntity } from '#common/serializers/model.serializer';

export const defaultUserTyperoupsForSerializing: string[] = [
  'user_type.timestamps',
];

export class UserTypeEntity extends ModelEntity implements IUserType {
  userType: string;
  label: string;
  active: boolean;
  @Expose({ groups: ['code.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['code.timestamps'] })
  updatedAt: Date;
}
