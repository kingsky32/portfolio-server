import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ICode } from '../interfaces/codes.interface';
import { ModelEntity } from '#common/serializers/model.serializer';

export const defaultCodeGroupsForSerializing: string[] = [];

export class CodeEntity extends ModelEntity implements ICode {
  @ApiProperty({ type: String })
  code: string;

  @ApiProperty({ type: String })
  label: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @Expose({ groups: ['code.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['code.timestamps'] })
  updatedAt: Date;
}
