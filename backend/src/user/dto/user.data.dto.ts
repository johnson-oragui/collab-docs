import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { UserResponseEntity } from './user.create.dto';

export class UserDataResponseDto {
  constructor(partial: Partial<UserDataResponseDto>) {
    Object.assign(partial, UserDataResponseDto);
  }
  @ApiProperty({
    example: 'User data retrieved successfully',
    required: true,
  })
  message: string = 'User data retrieved successfully';

  @ApiProperty({
    example: true,
    required: true,
  })
  success: boolean = true;

  @ApiProperty({
    example: {
      id: new ObjectId(),
      email: 'email@email.com',
      name: 'Johnson Dennis',
      createdAt: new Date(),
    },
    required: true,
  })
  data: UserResponseEntity;
}
