import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('join')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        profile: { type: 'string' },
      },
    },
  })
  async join(@Body() body: User) {
    return this.usersService.join(body);
  }
}
