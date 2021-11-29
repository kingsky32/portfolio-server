import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ILog } from '../interfaces/logs.interface';
import { User } from '#models/users/entities/users.entity';

@Entity({ name: 'logs' })
export class Log implements ILog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ name: 'log_time' })
  logTime: Date;
}
