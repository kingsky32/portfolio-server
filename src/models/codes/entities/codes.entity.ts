import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { ICode } from '../interfaces/codes.interface';

@Entity({ name: 'codes' })
export class Code implements ICode {
  @Column({ type: 'text', primary: true })
  code: string;

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
