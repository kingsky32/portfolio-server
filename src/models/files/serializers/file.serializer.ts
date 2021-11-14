import { Expose } from 'class-transformer';
import { IFile } from '../interfaces/files.interface';
import { ModelEntity } from '#common/serializers/model.serializer';

export const defaultFileGroupsForSerializing: string[] = ['file.timestamps'];

export const extendedFileGroupsForSerializing: string[] = [
  ...defaultFileGroupsForSerializing,
];

export const allFileGroupsForSerializing: string[] = [
  ...extendedFileGroupsForSerializing,
];

export class FileEntity extends ModelEntity implements IFile {
  id: string;
  uri: string;
  filename: string;
  mimetype: string;
  @Expose({ groups: ['file.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['file.timestamps'] })
  updatedAt: Date;
}
