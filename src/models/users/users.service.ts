import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import bcrypt from '#common/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findOne(username): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async join(body: User): Promise<User> {
    const bcryptPassword = await bcrypt.generate(body.password);

    body.password = bcryptPassword;

    return await this.usersRepository.createEntity(body, ['profile']);
  }
}
