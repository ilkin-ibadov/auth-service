import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { Role } from "../common/enums/role.enum"

@Schema()
export class User extends Document {
    @Prop({ unique: true })
    email: string;

    @Prop({ minLength: [8, "Password must be at least 8 characters long"] })
    password: string;

    @Prop({default: Role.USER})
    role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)