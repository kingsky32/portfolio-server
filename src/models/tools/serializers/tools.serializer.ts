import { Expose } from 'class-transformer';
import { ITool } from '../interfaces/tools.interface';
import { ModelEntity } from '#common/serializers/model.serializer';
import { File } from '#models/files/entities/files.entity';

export const defaultToolGroupsForSerializing: string[] = ['tool.timestamps'];

export class ToolEntity extends ModelEntity implements ITool {
  code: string;
  label: string;
  active: boolean;
  icon: File;
  @Expose({ groups: ['code.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['code.timestamps'] })
  updatedAt: Date;
}
