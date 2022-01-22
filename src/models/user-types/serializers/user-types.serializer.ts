import { Expose } from 'class-transformer';
import { IUserType } from '../interfaces/user-types.interface';
import { ModelEntity } from '#common/serializers/model.serializer';
import { ApiProperty } from '@nestjs/swagger';

export const defaultUserTyperoupsForSerializing: string[] = [];

export class UserTypeEntity extends ModelEntity implements IUserType {
  @ApiProperty({ type: String })
  userType: string;

  @ApiProperty({ type: String })
  label: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty({ type: Number })
  level: number;

  @Expose({ groups: ['user_type.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user_type.timestamps'] })
  updatedAt: Date;
}
