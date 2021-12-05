import { NotFoundException } from '@nestjs/common';
import { EntityRepository, DeepPartial } from 'typeorm';
import { Config } from './entities/configs.entity';
import { ModelRepository } from '../model.repository';
import {
  defaultConfigGroupsForSerializing,
  ConfigEntity,
} from './serializers/configs.serializer';
import { classToPlain, plainToClass } from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';

@EntityRepository(Config)
export class ConfigsRepository extends ModelRepository<Config, ConfigEntity> {
  async get(
    config: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<ConfigEntity | null> {
    return await this.findOne({
      where: { config },
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
    inputs: DeepPartial<Config>,
    relations: string[] = [],
  ): Promise<ConfigEntity> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).config, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: ConfigEntity,
    inputs: QueryDeepPartialEntity<Config>,
    relations: string[] = [],
  ): Promise<ConfigEntity> {
    return this.update(entity.config, inputs)
      .then(async () => await this.get(entity.config, relations))
      .catch((error) => Promise.reject(error));
  }

  transform(model: Config): ConfigEntity {
    const tranformOptions: ClassTransformOptions = {
      groups: defaultConfigGroupsForSerializing,
    };
    return plainToClass(
      ConfigEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: Config[]): ConfigEntity[] {
    return models.map((model) => this.transform(model));
  }
}
