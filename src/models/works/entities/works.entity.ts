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
import { User } from '#models/users/entities/users.entity';
import { WorksTool } from './works-tools.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'works' })
export class Work implements IWork {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Platform, (platform) => platform.platform)
  @JoinColumn({ name: 'platform', referencedColumnName: 'platform' })
  @ApiProperty({ type: () => Platform })
  platform: Platform;

  @Column({ type: 'text' })
  @ApiProperty({ type: String })
  title: string;

  @Column({ type: 'text' })
  @ApiProperty({ type: String })
  description: string;

  @Column({ type: 'text' })
  @ApiProperty({ type: String })
  meta: string;

  @ManyToOne(() => File, (file) => file.id)
  @JoinColumn({ name: 'thumbnail', referencedColumnName: 'id' })
  @ApiProperty({ type: () => File })
  thumbnail: File;

  @Column({ type: 'text' })
  @ApiProperty({ type: String })
  github: string;

  @Column({ type: 'text' })
  @ApiProperty({ type: String })
  page: string;

  @OneToMany(() => WorksTool, (worksTool) => worksTool.work)
  @JoinColumn({ name: 'tools', referencedColumnName: 'work' })
  @ApiProperty({ type: [Tool] })
  tools: Tool[];

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ type: Date })
  startAt: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ type: Date })
  endAt: Date;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ type: Boolean })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @ApiProperty({ type: Boolean })
  updatedAt: Date;
}
