import { ToolsRepository } from './tools.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolEntity } from './serializers/tools.serializer';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(ToolsRepository)
    private readonly toolsRepository: ToolsRepository,
  ) {}

  async create(toolEntity: ToolEntity): Promise<ToolEntity | null> {
    return await this.toolsRepository.createEntity(toolEntity, ['icon']);
  }

  async getAll(relations: string[] = ['icon']): Promise<ToolEntity[]> {
    return await this.toolsRepository.getAll({
      relations,
    });
  }

  async delete(tool: string): Promise<boolean> {
    const { affected } = await this.toolsRepository.delete({ tool });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
