import { ConfigsRepository } from './configs.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from './serializers/configs.serializer';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(ConfigsRepository)
    private readonly codesRepository: ConfigsRepository,
  ) {}

  async create(codeEntity: ConfigEntity): Promise<ConfigEntity> {
    return await this.codesRepository.createEntity(codeEntity);
  }

  async getAll(): Promise<ConfigEntity[]> {
    return await this.codesRepository.getAll({ where: { isSystem: false } });
  }

  async delete(config: string): Promise<boolean> {
    const { affected } = await this.codesRepository.delete({ config });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
