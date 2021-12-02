import { PaginatedDto } from './../../common/dtos/paginated.dto';
import { UserEntity } from '#models/users/serializers/users.serializer';
import { WorksRepository } from './works.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkEntity } from './serializers/works.serializer';
import { CreateWorkDto } from './dto/works.dto';
import { PaginationDto } from '#/common/dtos/paginated.dto';

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(WorksRepository)
    private readonly worksRepository: WorksRepository,
  ) {}

  async create(
    createWorkDto: CreateWorkDto,
    user: UserEntity,
  ): Promise<WorkEntity> {
    return await this.worksRepository.createEntity({ user, ...createWorkDto }, [
      'user',
      'platform',
      'thumbnail',
      'tools',
    ]);
  }

  async getAll(
    paginationDto: PaginationDto,
    relations: string[] = [],
  ): Promise<PaginatedDto<WorkEntity>> {
    return await this.worksRepository.getAll({
      where: { isActive: true },
      pagination: {
        pageable: true,
        ...paginationDto,
      },
      relations,
    });
  }

  async get(id: string, relations: string[] = []): Promise<WorkEntity> {
    return await this.worksRepository.get(id, relations, true);
  }

  async delete(id: string, user: UserEntity): Promise<boolean> {
    const work = await this.worksRepository.get(id, ['user'], true);
    if (work.user.id !== user.id) {
      throw new HttpException(`it's not your post.`, HttpStatus.FORBIDDEN);
    }
    const { affected } = await this.worksRepository.delete({ id });
    if (affected < 1) {
      throw new HttpException('operation failed.', HttpStatus.CONFLICT);
    }
    return true;
  }
}
