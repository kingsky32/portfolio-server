import { NotFoundException } from '@nestjs/common';
import { EntityRepository, DeepPartial } from 'typeorm';
import { Code } from './entities/codes.entity';
import { ModelRepository } from '../model.repository';
import {
  defaultCodeGroupsForSerializing,
  CodeEntity,
} from './serializers/codes.serializer';
import {
  classToPlain,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@EntityRepository(Code)
export class CodesRepository extends ModelRepository<Code, CodeEntity> {
  async get(
    code: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<CodeEntity | null> {
    return await this.findOne({
      where: { code },
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
    inputs: DeepPartial<Code>,
    relations: string[] = [],
  ): Promise<CodeEntity> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).code, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: CodeEntity,
    inputs: QueryDeepPartialEntity<Code>,
    relations: string[] = [],
  ): Promise<CodeEntity> {
    return this.update(entity.code, inputs)
      .then(async () => await this.get(entity.code, relations))
      .catch((error) => Promise.reject(error));
  }

  transform(model: Code): CodeEntity {
    const tranformOptions: ClassTransformOptions = {
      groups: defaultCodeGroupsForSerializing,
    };
    return plainToClass(
      CodeEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: Code[]): CodeEntity[] {
    return models.map((model) => this.transform(model));
  }
}
