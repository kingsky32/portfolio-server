import { UserEntity } from './serializers/users.serializer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import bcrypt from '#common/utils/bcrypt';
import { FindOneOptions } from 'typeorm';

export type UserFindOneRequestBody =
  | Pick<User, 'id'>
  | (Partial<Pick<User, 'id' | 'email' | 'username'>> & FindOneOptions<User>);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async get(
    id: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserEntity | null> {
    return await this.usersRepository.get(id, relations, throwsException);
  }

  async findOne(body: UserFindOneRequestBody): Promise<User | undefined> {
    return await this.usersRepository.findOne(body);
  }

  async create(body: User): Promise<User> {
    const user = await this.findOne({
      where: [{ email: body.email }, { username: body.username }],
    });

    if (Boolean(user)) {
      throw new HttpException('account already exists.', HttpStatus.FORBIDDEN);
    }

    const bcryptPassword = await bcrypt.generate(body.password);
    body.password = bcryptPassword;

    return await this.usersRepository.createEntity(body, ['profile']);
  }
}
