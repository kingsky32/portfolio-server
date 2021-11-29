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

  @ApiProperty({ type: Boolean, default: false })
  isActive: boolean;
}

export class UpdateUserDto {
  @ApiProperty({ type: () => File })
  profile: File;
}
