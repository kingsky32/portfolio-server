import { ApiProperty } from '@nestjs/swagger';
import { User } from '#models/users/entities/users.entity';
import { Platform } from '#models/platforms/entities/platforms.entity';
import { File } from '#models/files/entities/files.entity';
import { Tool } from '#models/tools/entities/tools.entity';

export class CreateWorkDto {
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

  @ApiProperty({
    type: Boolean,
    default: false,
  })
  isActive: boolean;
}
