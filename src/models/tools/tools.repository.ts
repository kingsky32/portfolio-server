import { NotFoundException } from '@nestjs/common';
import { EntityRepository, DeepPartial } from 'typeorm';
import { Tool } from './entities/tools.entity';
import { ModelRepository } from '../model.repository';
import {
  defaultToolGroupsForSerializing,
  ToolEntity,
} from './serializers/tools.serializer';
import { classToPlain, plainToClass } from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';

@EntityRepository(Tool)
export class ToolsRepository extends ModelRepository<Tool, ToolEntity> {
  async get(
    tool: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ToolEntity | null> {
    return await this.findOne({
      where: { tool },
      relations,
    })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entity ? this.transform(entity) : null);
      })
      .catch((error) => Promise.reject(error));
  }

  async createEntity(
    inputs: DeepPartial<Tool>,
    relations: string[] = [],
  ): Promise<ToolEntity> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).tool, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: ToolEntity,
    inputs: QueryDeepPartialEntity<Tool>,
    relations: string[] = [],
  ): Promise<ToolEntity> {
    return this.update(entity.tool, inputs)
      .then(async () => await this.get(entity.tool, relations))
      .catch((error) => Promise.reject(error));
  }

  transform(model: Tool): ToolEntity {
    const tranformOptions: ClassTransformOptions = {
      groups: defaultToolGroupsForSerializing,
    };
    return plainToClass(
      ToolEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: Tool[]): ToolEntity[] {
    return models.map((model) => this.transform(model));
  }
}
