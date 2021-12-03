import { FindOneOptions } from 'typeorm';
import { User } from '#models/users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { File } from '#models/files/entities/files.entity';

export class CreateUserDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: () => File })
  profile: File;
}

export class UpdateUserDto {
  @ApiProperty({ type: () => File })
  profile: File;
}

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
