import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ITool } from '../interfaces/tools.interface';
import { ModelEntity } from '#common/serializers/model.serializer';
import { File } from '#models/files/entities/files.entity';

export const defaultToolGroupsForSerializing: string[] = [];

export class ToolEntity extends ModelEntity implements ITool {
  @ApiProperty({ type: String })
  tool: string;

  @ApiProperty({ type: String })
  label: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty({ type: String })
  icon: File;

  @Expose({ groups: ['tool.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['tool.timestamps'] })
  updatedAt: Date;
}
