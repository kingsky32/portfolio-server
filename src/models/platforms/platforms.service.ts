import { PlatformsRepository } from './platforms.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlatformEntity } from './serializers/platforms.serializer';
import { IPlatform } from './interfaces/platforms.interface';
import { Platform } from './entities/platforms.entity';

@Injectable()
export class PlatformssService {
  constructor(
    @InjectRepository(PlatformsRepository)
    private readonly platformsRepository: PlatformsRepository,
  ) {}

  async create(body: IPlatform): Promise<PlatformEntity> {
    return await this.platformsRepository.createEntity(body);
  }

  async findAll(): Promise<Platform[]> {
    return await this.platformsRepository.find();
  }

  async delete(platform: string): Promise<boolean> {
    const { affected } = await this.platformsRepository.delete({ platform });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
