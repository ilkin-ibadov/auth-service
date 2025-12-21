import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserReplicaDto } from './dto/user-replica.dto';

@Controller('internal/users')
export class UserInternalController {
  constructor(private readonly userService: UserService) {}

  @Get('replica')
  async getReplicaUsers(): Promise<UserReplicaDto[]> {
    return this.userService.getUsersForReplica();
  }
}
