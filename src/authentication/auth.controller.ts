import { AuthService } from './auth.service';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '#common/guards/local-auth.guard';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ type: LoginResponseDto })
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
