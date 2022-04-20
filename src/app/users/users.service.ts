import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import CreateUserDto from './dto/create-user.dto'
import { User } from '../../entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username })
  }

  async findById(uuid: string): Promise<User> {
    return await this.usersRepository.findOne(uuid)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepository.create(createUserDto)
      return await this.usersRepository.save(user)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Username already exists', HttpStatus.CONFLICT)
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(username: string): Promise<void> {
    try {
      await this.usersRepository.delete({ username })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
