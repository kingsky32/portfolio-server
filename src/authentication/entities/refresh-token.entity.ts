import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IRefreshToken } from './../interfaces/refresh-token.interface';
import { User } from '#models/users/entities/users.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken implements IRefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.id, { primary: true })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'is_revoked', type: 'boolean', default: false })
  isRevoked: boolean;

  @CreateDateColumn({ name: 'expires' })
  expires: Date;
}
