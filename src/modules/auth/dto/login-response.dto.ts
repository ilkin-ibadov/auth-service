import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token for authenticating requests',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token to get new access tokens',
    example: 'dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4=',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Unique session identifier',
    example: 'session_1234567890',
  })
  sessionId: string;

  @ApiProperty({
    description: 'Expiration time of access token in seconds',
    example: 3600,
  })
  expiresIn: number;
}
