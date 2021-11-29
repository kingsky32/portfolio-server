import { CodesRepository } from './codes.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeEntity } from './serializers/codes.serializer';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(CodesRepository)
    private readonly codesRepository: CodesRepository,
  ) {}

  async create(codeEntity: CodeEntity): Promise<CodeEntity> {
    return await this.codesRepository.createEntity(codeEntity);
  }

  async getAll(): Promise<CodeEntity[]> {
    return await this.codesRepository.getAll();
  }

  async delete(code: string): Promise<boolean> {
    const { affected } = await this.codesRepository.delete({ code });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
