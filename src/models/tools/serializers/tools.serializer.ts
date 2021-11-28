import { Expose } from 'class-transformer';
import { ITool } from '../interfaces/tools.interface';
import { ModelEntity } from '#common/serializers/model.serializer';
import { File } from '#models/files/entities/files.entity';

export const defaultToolGroupsForSerializing: string[] = [];

export class ToolEntity extends ModelEntity implements ITool {
  code: string;
  label: string;
  active: boolean;
  icon: File;
  @Expose({ groups: ['tool.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['tool.timestamps'] })
  updatedAt: Date;
}
