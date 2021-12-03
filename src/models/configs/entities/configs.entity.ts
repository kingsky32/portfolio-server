import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { IConfig } from '../interfaces/configs.interface';

@Entity({ name: 'configs' })
export class Config implements IConfig {
  @Column({ type: 'text', primary: true })
  config: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ name: 'is_system', type: 'boolean' })
  isSystem: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
