import { File } from '#/models/files/entities/files.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ITool } from '../interfaces/tools.interface';

@Entity({ name: 'tools' })
export class Tool implements ITool {
  @Column({ type: 'text', primary: true })
  tool: string;

  @Column({ type: 'text' })
  label: string;

  @ManyToOne(() => File, (file) => file.id)
  @JoinColumn({ name: 'icon', referencedColumnName: 'id' })
  icon: File;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
