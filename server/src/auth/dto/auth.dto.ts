import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional({
    message: 'Email address is required',
  })
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  @IsString({
    message: 'Password is required',
  })
  password: string;
}
