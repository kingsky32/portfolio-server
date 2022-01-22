import { UserTypesRepository } from './../user-types/user-types.repository';
import { PaginationDto, PaginatedDto } from '#/common/dtos/paginated.dto';
import { UserEntity } from './serializers/users.serializer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import bcrypt from '#common/utils/bcrypt';
import {
  CreateUserDto,
  UpdateUserDto,
  UserFindOneRequestBody,
} from './dtos/users.dto';
import { ConfigsRepository } from '../configs/configs.repository';
import { DEFAULT_USER_TYPE } from '#common/constants/configs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly userTypesRepository: UserTypesRepository,
    private readonly configsRepository: ConfigsRepository,
  ) {}

  async get(
    id: string,
    relations: string[] = ['profile', 'userType'],
    throwsException = true,
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

    const userTypeConfig = await this.configsRepository.get(DEFAULT_USER_TYPE);

    if (!userTypeConfig) {
      throw new HttpException(
        'default_user_type is not specified.',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const userType = await this.userTypesRepository.get(userTypeConfig.value);

    if (!userType) {
      throw new HttpException('userType is not found.', HttpStatus.NOT_FOUND);
    }

    if (Boolean(user)) {
      throw new HttpException('account already exists.', HttpStatus.FORBIDDEN);
    }

    const bcryptPassword = await bcrypt.generate(createUserDto.password);
    createUserDto.password = bcryptPassword;

    return await this.usersRepository.createEntity(
      { ...createUserDto, userType },
      ['profile', 'userType'],
    );
  }

  async getAll(
    paginationDto: PaginationDto,
    relations: string[] = ['profile', 'userType'],
  ): Promise<PaginatedDto<UserEntity>> {
    return await this.usersRepository.getAll({
      where: { isActive: true },
      pagination: {
        pageable: true,
        ...paginationDto,
      },
      relations,
    });
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
  }
}
