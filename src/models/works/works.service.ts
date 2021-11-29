import { WorksRepository } from './works.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkEntity } from './serializers/works.serializer';
import { IWork } from './interfaces/works.interface';
import { Work } from './entities/works.entity';

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(WorksRepository)
    private readonly worksRepository: WorksRepository,
  ) {}

  async create(body: IWork): Promise<WorkEntity> {
    return await this.worksRepository.createEntity(body, ['icon']);
  }

  async getAll(): Promise<Work[]> {
    return await this.worksRepository.getAll(['icon']);
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.worksRepository.delete({ id });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
