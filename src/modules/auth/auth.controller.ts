import { Controller, Post, Body, Get, Query, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { ForgotDto } from './dto/forgot.dto';
import { ResetDto } from './dto/reset.dto';
import { ApiTags, ApiQuery, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { MessageResponseDto } from './dto/message-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UserService) { }

    @Post('register')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({ description: 'User created successfully.', type: MessageResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed.' })
    async register(@Body() dto: RegisterDto) {
        const user = await this.usersService.createUser(dto.email, dto.password, dto.name);
        await this.usersService.createEmailVerification(user);
        return { message: 'User created. Check email for verification.' };
    }

    @Get('verify-email')
    @ApiOperation({ summary: 'Verify user email' })
    @ApiQuery({ name: 'token', required: true, type: String, example: "e69c5da4b6e6876f1b644f520" })
    @ApiBadRequestResponse({ description: 'Token is required' })
    @ApiOkResponse({ description: 'Email verified successfully.', type: MessageResponseDto })
    async verify(@Query('token') token: string) {
        if (!token) throw new BadRequestException('Token is required');
        await this.usersService.confirmEmail(token);
        return { message: 'Email verified successfully.' };
    }

    @Post('login')
    @ApiOperation({ summary: 'Login for user' })
    @ApiOkResponse({ type: LoginResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed.' })
    async login(@Body() dto: LoginDto) {
        // ip/device could be provided by client or extracted from request in production
        return this.authService.login(dto.email, dto.password, dto.ip, dto.device);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh current tokens' })
    @ApiOkResponse({ type: RefreshResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed.' })
    async refresh(@Body() dto: RefreshDto) {
        return this.authService.refresh(dto.refreshToken);
    }

    @Post('forgot')
    @ApiOperation({ summary: 'Forgot password' })
    @ApiOkResponse({ type: MessageResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed.' })
    async forgot(@Body() dto: ForgotDto) {
        const user = await this.usersService.findByEmail(dto.email);

        if (user) {
            await this.usersService.createPasswordReset(user);
        }

        return { message: 'If the email exists, a reset link has been sent.' };
    }

    @Post('reset')
    @ApiOperation({ summary: 'Reset password' })
    @ApiOkResponse({ type: MessageResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed.' })
    async reset(@Body() dto: ResetDto) {
        await this.usersService.resetPassword(dto.token, dto.newPassword);
        return { message: 'Password reset successful.' };
    }

    @Post('logout')
    @ApiOperation({ summary: 'Logout user' })
    @ApiOkResponse({ type: MessageResponseDto })
    @ApiBadRequestResponse({ description: 'Validation failed.' })
    async logout(@Body() dto: RefreshDto) {
        await this.authService.logout(dto.refreshToken);
        return { message: 'Logged out' };
    }
}
