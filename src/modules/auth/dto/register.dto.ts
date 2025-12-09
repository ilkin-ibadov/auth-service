import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email address of the new user',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    description: 'Password for the new account (minimum 6 characters)',
    example: 'StrongPass123!',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiPropertyOptional({
    description: 'Optional full name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Name cannot be empty if provided' })
  @IsString({ message: 'Name must be a string' })
  name?: string;
}
