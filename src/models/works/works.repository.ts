import { NotFoundException } from '@nestjs/common';
import { EntityRepository, DeepPartial } from 'typeorm';
import { Work } from './entities/works.entity';
import { ModelRepository } from '../model.repository';
import {
  allWorkGroupsForSerializing,
  WorkEntity,
} from './serializers/works.serializer';
import {
  classToPlain,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@EntityRepository(Work)
export class WorksRepository extends ModelRepository<Work, WorkEntity> {
  async get(
    id: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<WorkEntity | null> {
    return await this.findOne({
      where: { id },
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
    inputs: DeepPartial<Work>,
    relations: string[] = [],
  ): Promise<WorkEntity> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: WorkEntity,
    inputs: QueryDeepPartialEntity<Work>,
    relations: string[] = [],
  ): Promise<WorkEntity> {
    return this.update(entity.id, inputs)
      .then(async () => await this.get(entity.id, relations))
      .catch((error) => Promise.reject(error));
  }

  transform(model: Work): WorkEntity {
    const tranformOptions: ClassTransformOptions = {
      groups: allWorkGroupsForSerializing,
    };
    return plainToClass(
      WorkEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: Work[]): WorkEntity[] {
    return models.map((model) => this.transform(model));
  }
}
