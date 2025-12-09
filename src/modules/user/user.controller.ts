import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({
        description: 'List of all users',
        type: UserResponseDto,
        isArray: true,
    })
    list() {
        return this.userService.listAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'Unique identifier of the user', example: '64fa3b8f4a1c2e00123abcd4' })
    @ApiOkResponse({ description: 'User found', type: UserResponseDto })
    @ApiNotFoundResponse({ description: 'User not found' })
    async get(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
