import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: String })
  access_token: string;

  @ApiProperty({ type: String })
  refresh_token: string;
}
