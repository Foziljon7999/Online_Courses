
import { IsString, IsEmail, IsOptional, IsIn, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50, { message: 'Username 50 ta belgidan oshmasligi kerak' })
  username: string;

  @IsEmail({}, { message: 'Noto‘g‘ri email format' })
  @MaxLength(100, { message: 'Email 100 ta belgidan oshmasligi kerak' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  @MaxLength(50, { message: 'Parol 50 ta belgidan oshmasligi kerak' })
  password: string;

  @IsOptional()
  @IsIn(['admin'], { message: 'Role faqat admin bo‘lishi kerak' })
  role?: string;
}


