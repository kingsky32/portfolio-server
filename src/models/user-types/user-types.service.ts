import { UserTypesRepository } from './user-types.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeEntity } from './serializers/user-types.serializer';

@Injectable()
export class UserTypesService {
  constructor(
    @InjectRepository(UserTypesRepository)
    private readonly userTypesRepository: UserTypesRepository,
  ) {}

  async create(userTypeEntity: UserTypeEntity): Promise<UserTypeEntity | null> {
    return await this.userTypesRepository.createEntity(userTypeEntity);
  }

  async getAll(): Promise<UserTypeEntity[]> {
    return await this.userTypesRepository.getAll();
  }

  async delete(userType: string): Promise<boolean> {
    const { affected } = await this.userTypesRepository.delete({ userType });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
