import { LogsRepository } from './logs.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from './serializers/logs.serializer';
import { ILog } from './interfaces/logs.interface';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogsRepository)
    private readonly logsRepository: LogsRepository,
  ) {}

  async create(body: ILog): Promise<LogEntity> {
    return await this.logsRepository.createEntity(body);
  }

  async getAll(): Promise<LogEntity[]> {
    return await this.logsRepository.getAll();
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.logsRepository.delete({ id });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
