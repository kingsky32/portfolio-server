import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Tool } from '#models/tools/entities/tools.entity';
import { IWorkTool } from '../interfaces/works-tools.interface';
import { Work } from './works.entity';

@Entity({ name: 'works_tools' })
export class WorksTool implements IWorkTool {
  @ManyToOne(() => Tool, (tool) => tool.tool, { primary: true })
  @JoinColumn({ name: 'tool', referencedColumnName: 'tool' })
  tool: Tool;

  @ManyToOne(() => Work, (work) => work.id, { primary: true })
  @JoinColumn({ name: 'work', referencedColumnName: 'id' })
  work: Work;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
