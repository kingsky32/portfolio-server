import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IWork } from '../interfaces/works.interface';
import { Platform } from '#models/platforms/entities/platforms.entity';
import { File } from '#models/files/entities/files.entity';
import { Tool } from '#models/tools/entities/tools.entity';
import { User } from '#/models/users/entities/users.entity';
import { WorkTool } from './works-tools.entity';

@Entity({ name: 'tools' })
export class Work implements IWork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Platform, (platform) => platform.platform)
  @JoinColumn({ name: 'platform', referencedColumnName: 'platform' })
  platform: Platform;

  @Column({ type: 'string' })
  title: string;

  @Column({ type: 'string' })
  description: string;

  @Column({ type: 'string' })
  meta: string;

  @ManyToOne(() => File, (file) => file.id)
  @JoinColumn({ name: 'thumbnail', referencedColumnName: 'id' })
  thumbnail: File;

  @Column({ type: 'string' })
  github: string;

  @Column({ type: 'string' })
  page: string;

  @OneToMany(() => WorkTool, (workTool) => workTool.work)
  @JoinColumn({ name: 'tools', referencedColumnName: 'work' })
  tools: Tool[];

  @Column({ type: 'date' })
  startAt: Date;

  @Column({ type: 'date' })
  endAt: Date;

  @Column({ type: 'boolean', default: false, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
