import { File } from '#models/files/entities/files.entity';

export interface ITool {
  tool: string;
  label: string;
  icon: File;
  isActive: boolean;
}
