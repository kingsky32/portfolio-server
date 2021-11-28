import { EntityRepository } from 'typeorm';
import { Log } from './entities/logs.entity';
import { ModelRepository } from '../model.repository';
import {
  defaultLogGroupsForSerializing,
  LogEntity,
} from './serializers/logs.serializer';
import { classToPlain, plainToClass } from 'class-transformer';

@EntityRepository(Log)
export class LogsRepository extends ModelRepository<Log, LogEntity> {
  transform(model: Log): LogEntity {
    const tranformOptions = {
      groups: defaultLogGroupsForSerializing,
    };
    return plainToClass(
      LogEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: Log[]): LogEntity[] {
    return models.map((model) => this.transform(model));
  }
}
