import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common'
import { LocalAuthGuard } from './local.guard'
import { AuthService } from './auth.service'
import { Public } from './auth.decorator '
import CreateUserDto from '../users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body)
  }

  @Get('me')
  getProfile(@Request() req: any) {
    return req.user
  }
}
