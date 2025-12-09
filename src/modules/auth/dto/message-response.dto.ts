import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
    @ApiProperty({
        description: 'A human-readable message describing the result of the operation',
        example: 'User created. Check email for verification.',
    })
    message: string;
}
