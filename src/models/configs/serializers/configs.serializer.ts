import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IConfig } from '../interfaces/configs.interface';
import { ModelEntity } from '#common/serializers/model.serializer';

export const defaultConfigGroupsForSerializing: string[] = [];

export class ConfigEntity extends ModelEntity implements IConfig {
  @ApiProperty({ type: String })
  config: string;

  @ApiProperty({ type: String })
  value: string;

  @ApiProperty({ type: Boolean })
  @Expose({ groups: ['code.is_system'] })
  isSystem: boolean;

  @Expose({ groups: ['code.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['code.timestamps'] })
  updatedAt: Date;
}
