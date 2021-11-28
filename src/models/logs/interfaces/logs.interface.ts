import { User } from '#models/users/entities/users.entity';

export interface ILog {
  logTime: Date;
  user: User;
}
