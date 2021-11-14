import { EntityRepository } from 'typeorm';
import { File } from './entities/files.entity';
import { ModelRepository } from '../model.repository';
import {
  allFileGroupsForSerializing,
  FileEntity,
} from './serializers/file.serializer';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(File)
export class FilesRepository extends ModelRepository<File, FileEntity> {
  transform(model: File): FileEntity {
    const tranformOptions = {
      groups: allFileGroupsForSerializing,
    };
    return plainToClass(
      FileEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: File[]): FileEntity[] {
    return models.map((model) => this.transform(model));
  }
}
