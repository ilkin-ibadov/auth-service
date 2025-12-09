import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetDto {
  @ApiProperty({
    description: 'The password reset token sent to the user via email',
    example: 'e69c5da4b6e6876f1b644f520',
  })
  @IsNotEmpty({ message: 'Token is required' })
  @IsString({ message: 'Token must be a string' })
  token: string;

  @ApiProperty({
    description: 'The new password for the account (minimum 6 characters)',
    example: 'NewStrongPass123!',
  })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'New password must be at least 6 characters' })
  newPassword: string;
}
