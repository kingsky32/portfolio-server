import { PaginatedDto, PaginationDto } from '#/common/dtos/paginated.dto';
import { plainToClass } from 'class-transformer';
import { Repository, DeepPartial, FindManyOptions } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ModelEntity } from '../common/serializers/model.serializer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface PaginationOptions extends PaginationDto {
  pageable?: boolean;
}

export interface GetAllOptions<T extends ModelEntity>
  extends FindManyOptions<T> {
  pagination?: PaginationOptions;
}

export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {
  getAll<O extends GetAllOptions<K>>(
    options?: O,
  ): O['pagination']['pageable'] extends true
    ? Promise<PaginatedDto<K> | null>
    : Promise<K[] | null>;
  async getAll(
    options?: GetAllOptions<K>,
  ): Promise<K[] | PaginatedDto<K> | null> {
    const { pagination, ..._options } = options ?? {};

    if (pagination?.pageable === true) {
      const totalResults = await this.count({
        where: _options.where,
      });
      const skip = Number(
        pagination.offset + (pagination.page - 1) * pagination.limit,
      );
      const results = await this.find({
        take: pagination.limit,
        skip,
        ..._options,
      });

      const paginatedDto: PaginatedDto<K> = {
        pageInfo: {
          totalResults: Number(totalResults),
          resultsPerPage: results.length,
          page: Number(pagination.page),
          limit: Number(pagination.limit),
          offset: Number(pagination.offset),
        },
        results: this.transformMany(results),
      };

      return paginatedDto;
    }

    return await this.find(_options)
      .then((entities) => {
        return Promise.resolve(entities ? this.transformMany(entities) : null);
      })
      .catch((error) => Promise.reject(error));
  }

  async get(
    id: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<K | null> {
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
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<K> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: K,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<K> {
    return this.update(entity.id, inputs)
      .then(async () => await this.get(entity.id, relations))
      .catch((error) => Promise.reject(error));
  }

  transform(model: T, transformOptions = {}): K {
    return plainToClass(ModelEntity, model, transformOptions) as K;
  }

  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions));
  }
}
