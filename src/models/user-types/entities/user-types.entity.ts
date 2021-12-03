import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { IUserType } from '../interfaces/user-types.interface';

@Entity({ name: 'user_types' })
export class UserType implements IUserType {
  @Column({ name: 'user_type', type: 'text', primary: true })
  userType: string;

  @Column({ type: 'text' })
  label: string;

  @Column({ type: 'int', default: 0 })
  level: number;

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
