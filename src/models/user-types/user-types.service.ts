import { GetAllOptions } from './../model.repository';
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

  async get(
    userType: string,
    relations: string[] = [],
    throwsException = true,
  ): Promise<UserTypeEntity> {
    return await this.userTypesRepository.get(
      userType,
      relations,
      throwsException,
    );
  }

  async getAll(
    options?: GetAllOptions<UserTypeEntity>,
  ): Promise<UserTypeEntity[]> {
    return await this.userTypesRepository.getAll(options);
  }

  async delete(userType: string): Promise<boolean> {
    const { affected } = await this.userTypesRepository.delete({ userType });
    if (affected < 1) {
      throw new ConflictException();
    }
    return true;
  }
}
