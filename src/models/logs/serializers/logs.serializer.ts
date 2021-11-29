import { ApiProperty } from '@nestjs/swagger';
import { User } from '#models/users/entities/users.entity';
import { ILog } from '../interfaces/logs.interface';
import { ModelEntity } from '#common/serializers/model.serializer';

export const defaultLogGroupsForSerializing: string[] = [];

export class LogEntity extends ModelEntity implements ILog {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: Date })
  logTime: Date;
}
