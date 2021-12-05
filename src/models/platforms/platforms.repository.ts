import { NotFoundException } from '@nestjs/common';
import { EntityRepository, DeepPartial } from 'typeorm';
import { Platform } from './entities/platforms.entity';
import { ModelRepository } from '../model.repository';
import {
  defaultPlatformGroupsForSerializing,
  PlatformEntity,
} from './serializers/platforms.serializer';
import { classToPlain, plainToClass } from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';

@EntityRepository(Platform)
export class PlatformsRepository extends ModelRepository<
  Platform,
  PlatformEntity
> {
  async get(
    platform: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<PlatformEntity | null> {
    return await this.findOne({
      where: { platform },
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
    inputs: DeepPartial<Platform>,
    relations: string[] = [],
  ): Promise<PlatformEntity> {
    return this.save(inputs)
      .then(
        async (entity) => await this.get((entity as any).platform, relations),
      )
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: PlatformEntity,
    inputs: QueryDeepPartialEntity<Platform>,
    relations: string[] = [],
  ): Promise<PlatformEntity> {
    return this.update(entity.platform, inputs)
      .then(async () => await this.get(entity.platform, relations))
      .catch((error) => Promise.reject(error));
  }

  transform(model: Platform): PlatformEntity {
    const tranformOptions: ClassTransformOptions = {
      groups: defaultPlatformGroupsForSerializing,
    };
    return plainToClass(
      PlatformEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: Platform[]): PlatformEntity[] {
    return models.map((model) => this.transform(model));
  }
}
