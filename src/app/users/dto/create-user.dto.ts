import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsAlphanumeric()
  @MaxLength(32)
  @IsNotEmpty()
  username: string

  @IsString()
  @MaxLength(32)
  @MinLength(6)
  @IsNotEmpty()
  password: string
}

export default CreateUserDto
