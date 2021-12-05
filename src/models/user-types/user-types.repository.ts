import { NotFoundException } from '@nestjs/common';
import { EntityRepository, DeepPartial } from 'typeorm';
import { UserType } from './entities/user-types.entity';
import { ModelRepository } from '../model.repository';
import {
  defaultUserTyperoupsForSerializing,
  UserTypeEntity,
} from './serializers/user-types.serializer';
import {
  classToPlain,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@EntityRepository(UserType)
export class UserTypesRepository extends ModelRepository<
  UserType,
  UserTypeEntity
> {
  async get(
    userType: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserTypeEntity | null> {
    return await this.findOne({
      where: { userType },
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
    inputs: DeepPartial<UserType>,
    relations: string[] = [],
  ): Promise<UserTypeEntity> {
    return this.save(inputs)
      .then(
        async (entity) => await this.get((entity as any).userType, relations),
      )
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: UserTypeEntity,
    inputs: QueryDeepPartialEntity<UserType>,
    relations: string[] = [],
  ): Promise<UserTypeEntity> {
    return this.update(entity.userType, inputs)
      .then(async () => await this.get(entity.userType, relations))
      .catch((error) => Promise.reject(error));
  }

  transform(model: UserType): UserTypeEntity {
    const tranformOptions: ClassTransformOptions = {
      groups: defaultUserTyperoupsForSerializing,
    };
    return plainToClass(
      UserTypeEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: UserType[]): UserTypeEntity[] {
    return models.map((model) => this.transform(model));
  }
}
