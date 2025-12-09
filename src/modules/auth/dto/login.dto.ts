import { IsEmail, MinLength, IsOptional, IsString, IsIP } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    description: 'Password of the user (minimum 6 characters)',
    example: 'StrongPass123!',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiPropertyOptional({
    description: 'Optional IP address from which the login is performed',
    example: '192.168.1.1',
  })
  @IsOptional()
  @IsIP(undefined, { message: 'IP must be a valid IPv4 or IPv6 address' })
  ip?: string;

  @ApiPropertyOptional({
    description: 'Optional device name or identifier',
    example: 'iPhone 14 Pro',
  })
  @IsOptional()
  @IsString({ message: 'Device must be a string' })
  device?: string;
}
