import { Tool } from '#models/tools/entities/tools.entity';
import { Work } from '../entities/works.entity';

export interface IWorkTool {
  tool: Tool;
  work: Work;
}
