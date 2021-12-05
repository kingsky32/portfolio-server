import { EntityRepository } from 'typeorm';
import { User } from './entities/users.entity';
import { ModelRepository } from '../model.repository';
import {
  defaultUserGroupsForSerializing,
  UserEntity,
} from './serializers/users.serializer';
import {
  classToPlain,
  plainToClass,
  ClassTransformOptions,
} from 'class-transformer';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
  transform(model: User): UserEntity {
    const tranformOptions: ClassTransformOptions = {
      groups: defaultUserGroupsForSerializing,
    };
    return plainToClass(
      UserEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: User[]): UserEntity[] {
    return models.map((model) => this.transform(model));
  }
}
