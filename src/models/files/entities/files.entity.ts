import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IFile } from '../interfaces/files.interface';

@Entity({ name: 'files' })
export class File implements IFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  uri: string;

  @Column({ type: 'text' })
  filename: string;

  @Column({ type: 'text' })
  mimetype: string;

  @CreateDateColumn()
  createdAt: Date;
}
