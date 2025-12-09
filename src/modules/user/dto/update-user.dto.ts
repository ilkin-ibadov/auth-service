import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({
        description: 'Optional refresh token associated with the user session',
        example: 'dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4=',
    })
    @IsOptional()
    @IsString({ message: 'Refresh token must be a string' })
    refreshToken?: string;
}
