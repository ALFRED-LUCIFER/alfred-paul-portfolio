import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string

  @IsEmail()
  @MaxLength(200)
  email: string

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  subject: string

  @IsOptional()
  @IsString()
  @MaxLength(50)
  budget?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(2000)
  message: string
}
