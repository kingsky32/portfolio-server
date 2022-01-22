import { FilesRepository } from './files.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './serializers/file.serializer';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesRepository)
    private readonly filesRepository: FilesRepository,
  ) {}

  async create(file: Express.MulterS3.File): Promise<FileEntity | null> {
    return await this.filesRepository.createEntity({
      uri: file.location,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }
}
