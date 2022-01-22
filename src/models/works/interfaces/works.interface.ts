import { User } from '#models/users/entities/users.entity';
import { File } from '#models/files/entities/files.entity';
import { Tool } from '#models/tools/entities/tools.entity';
import { Platform } from '#models/platforms/entities/platforms.entity';

export interface IWork {
  user: User;
  platform: Platform;
  title: string;
  description: string;
  meta: string;
  thumbnail: File;
  github: string;
  page: string;
  tools: Tool[];
  startAt: Date;
  endAt: Date;
  isActive: boolean;
}
