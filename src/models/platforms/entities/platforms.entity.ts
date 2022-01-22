import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { IPlatform } from '../interfaces/platforms.interface';

@Entity({ name: 'platforms' })
export class Platform implements IPlatform {
  @Column({ type: 'text', primary: true })
  platform: string;

  @Column({ type: 'text' })
  label: string;

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
