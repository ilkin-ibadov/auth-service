import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {AuthModule} from "./auth/auth.module"
import {UsersModule} from "./users/users.module"
import {TodosModule} from "./todos/todos.module"

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UsersModule,
    TodosModule
  ],
})
export class AppModule {}
