import { Expose } from 'class-transformer';
import { ICode } from '../interfaces/codes.interface';
import { ModelEntity } from '#common/serializers/model.serializer';

export const defaultCodeGroupsForSerializing: string[] = ['code.timestamps'];

export class CodeEntity extends ModelEntity implements ICode {
  code: string;
  label: string;
  active: boolean;
  @Expose({ groups: ['code.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['code.timestamps'] })
  updatedAt: Date;
}
