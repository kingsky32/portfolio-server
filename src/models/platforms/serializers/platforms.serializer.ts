import { Expose } from 'class-transformer';
import { IPlatform } from '../interfaces/platforms.interface';
import { ModelEntity } from '#common/serializers/model.serializer';

export const defaultPlatformGroupsForSerializing: string[] = [];

export class PlatformEntity extends ModelEntity implements IPlatform {
  platform: string;
  label: string;
  isActive: boolean;
  @Expose({ groups: ['code.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['code.timestamps'] })
  updatedAt: Date;
}
