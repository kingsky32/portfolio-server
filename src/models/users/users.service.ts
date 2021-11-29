import { UserEntity } from './serializers/users.serializer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import bcrypt from '#common/utils/bcrypt';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';

export type UserFindOneRequestBody =
  | Pick<User, 'id'>
  | (Partial<Pick<User, 'id' | 'email' | 'username'>> & FindOneOptions<User>);

export type UserUpdateRequestBody = Omit<
  User,
  | 'id'
  | 'email'
  | 'username'
  | 'password'
  | 'accountAccessFailCount'
  | 'userType'
  | 'createdAt'
  | 'updatedAt'
>;

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

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (Boolean(user)) {
      throw new HttpException('account already exists.', HttpStatus.FORBIDDEN);
    }

    const bcryptPassword = await bcrypt.generate(createUserDto.password);
    createUserDto.password = bcryptPassword;

    return await this.usersRepository.createEntity(createUserDto, [
      'profile',
      'userType',
    ]);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.get(id, [], true);

    if (!Boolean(user)) {
      throw new HttpException('Unregistered User', HttpStatus.UNAUTHORIZED);
    }

    return await this.usersRepository.updateEntity(user, updateUserDto, [
      'profile',
      'userType',
    ]);
  }

  async login(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.findOne({ username });

      if (!Boolean(user)) {
        throw new HttpException('Unregistered User', HttpStatus.UNAUTHORIZED);
      }

      const isCompare = await bcrypt.compare(password, user.password);

      if (isCompare === false) {
        await this.usersRepository.update(user.id, {
          accountAccessFailCount: Number(user.accountAccessFailCount) + 1,
        });
        throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
      }

      await this.usersRepository.update(user.id, {
        accountAccessFailCount: 0,
      });
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
