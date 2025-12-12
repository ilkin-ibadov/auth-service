import { ApiProperty } from '@nestjs/swagger';
// import { Role } from '../../../common/enums/role.enum';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '64fa3b8f4a1c2e00123abcd4',
  })
  _id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'newuser',
  })
  username: string;

  // @ApiProperty({
  //   description: 'Role assigned to the user',
  //   enum: Role,
  //   example: Role.USER,
  // })
  // role: Role;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2025-12-09T12:34:56.789Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2025-12-09T15:20:45.123Z',
  })
  updatedAt: string;
}
