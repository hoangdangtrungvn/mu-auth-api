import { HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import CreateUserDto from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    const isValidPassword = await user.validatePassword(password)
    if (!user || !isValidPassword) return null
    return user
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user.uuid }

    return {
      message: 'User logged in successfully',
      data: {
        access_token: this.jwtService.sign(payload),
        expires_in: Number(process.env.JWT_EXPIRES_IN),
        refresh_token: null,
        token_type: 'bearer',
        user,
      },
    }
  }

  async register(data: CreateUserDto): Promise<any> {
    const user = await this.usersService.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    })

    const payload = { username: user.username, sub: user.uuid }

    return {
      message: 'User created successfully',
      data: {
        access_token: this.jwtService.sign(payload),
        expires_in: Number(process.env.JWT_EXPIRES_IN),
        refresh_token: null,
        token_type: 'bearer',
        user,
      },
      status: HttpStatus.CREATED,
    }
  }
}
