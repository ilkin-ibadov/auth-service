import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponseDto {
    @ApiProperty({
        description: 'New JWT access token for authenticating requests',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken: string;

    @ApiProperty({
        description: 'New JWT refresh token to obtain future access tokens',
        example: 'dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4=',
    })
    refreshToken: string;

    @ApiProperty({
        description: 'Unique session identifier associated with the user session',
        example: 'session_1234567890',
    })
    sessionId: string;
}
