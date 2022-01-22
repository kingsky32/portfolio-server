import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IWork } from '../interfaces/works.interface';
import { ModelEntity } from '#common/serializers/model.serializer';
import { File } from '#models/files/entities/files.entity';
import { User } from '#models/users/entities/users.entity';
import { Platform } from '#models/platforms/entities/platforms.entity';
import { Tool } from '#models/tools/entities/tools.entity';

export const defaultWorkGroupsForSerializing: string[] = ['work.timestamps'];

export const allWorkGroupsForSerializing: string[] = [
  ...defaultWorkGroupsForSerializing,
  'work.is_active',
];

export class WorkEntity extends ModelEntity implements IWork {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: () => Platform })
  platform: Platform;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  meta: string;

  @ApiProperty({ type: () => File })
  thumbnail: File;

  @ApiProperty({ type: String })
  github: string;

  @ApiProperty({ type: String })
  page: string;

  @ApiProperty({ type: () => [Tool] })
  tools: Tool[];

  @ApiProperty({ type: Date })
  startAt: Date;

  @ApiProperty({ type: Date })
  endAt: Date;

  @Expose({ groups: ['work.is_active'] })
  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @Expose({ groups: ['work.timestamps'] })
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose({ groups: ['work.timestamps'] })
  @ApiProperty({ type: Date })
  updatedAt: Date;
}
