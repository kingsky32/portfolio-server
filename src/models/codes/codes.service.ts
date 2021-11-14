import { CodesRepository } from './codes.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeEntity } from './serializers/codes.serializer';
import { ICode } from './interfaces/codes.interface';
import { Code } from './entities/codes.entity';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(CodesRepository)
    private readonly codesRepository: CodesRepository,
  ) {}

  async create(body: ICode): Promise<CodeEntity> {
    return await this.codesRepository.createEntity(body);
  }

  async findAll(): Promise<Code[]> {
    return await this.codesRepository.find();
  }

  async delete(code: string): Promise<boolean> {
    const { affected } = await this.codesRepository.delete({ code });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
