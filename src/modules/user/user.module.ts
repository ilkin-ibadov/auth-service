import { Module } from "@nestjs/common";
import { UserService } from "./user.service"
import { UserController } from "./user.controller"
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from './session.entity';
import { PasswordReset } from './password-reset.entity';
import { EmailVerification } from './email-verification.entity';
import { User as UserEntity } from './user.entity';
import { MailModule } from '../mail/mail.module';
import { UserInternalController } from "./user-internal.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, EmailVerification, PasswordReset, UserSession]),
        MailModule
    ],
    providers: [UserService],
    controllers: [UserController, UserInternalController],
    exports: [UserService]
})

export class UserModule { }