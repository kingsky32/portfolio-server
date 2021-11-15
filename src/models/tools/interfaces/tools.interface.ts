import { File } from '#models/files/entities/files.entity';

export interface ITool {
  code: string;
  label: string;
  icon: File;
  active: boolean;
}
