import { ToolsRepository } from './tools.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolEntity } from './serializers/tools.serializer';
import { ITool } from './interfaces/tools.interface';
import { Tool } from './entities/tools.entity';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(ToolsRepository)
    private readonly toolsRepository: ToolsRepository,
  ) {}

  async create(body: ITool): Promise<ToolEntity> {
    return await this.toolsRepository.createEntity(body, ['icon']);
  }

  async getAll(): Promise<Tool[]> {
    return await this.toolsRepository.getAll(['icon']);
  }

  async delete(tool: string): Promise<boolean> {
    const { affected } = await this.toolsRepository.delete({ tool });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
