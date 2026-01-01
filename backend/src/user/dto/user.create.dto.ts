import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsPasswordMatch } from './user-custom-validator/isPasswordMatch.validator';
import { IsEMailUniqueConstraint } from './user-custom-validator/uniqueEmail.validator';
import { ObjectId } from 'mongodb';
import { IsTrue } from './user-custom-validator/isTrue.validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'User email',
    example: 'johnson@email.com',
    required: true,
  })
  @IsEmail()
  @Validate(IsEMailUniqueConstraint) // for database email unique check
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Johnson1234#',
    required: true,
  })
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @ApiProperty({
    description: 'User email',
    example: 'Johnson1234#',
    required: true,
  })
  @IsString()
  @IsPasswordMatch('password')
  confirmPassword: string;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsTrue()
  acceptTerms: boolean;

  @ApiPropertyOptional({
    description: "User's firstname",
    example: 'Johnson',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiPropertyOptional({
    description: "User's lastname",
    example: 'Dennis',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastname?: string;
}

export class UserResponseEntity {
  @Expose()
  id: ObjectId;

  @Expose()
  email: string;

  @Expose()
  name?: string | null;

  @Expose()
  acceptTerms: boolean;

  @Expose()
  createdAt: Date;

  @Exclude()
  password?: string;

  @Exclude()
  role?: string;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  _id: ObjectId;

  constructor(partial: Partial<UserResponseEntity>) {
    Object.assign(this, partial);
  }
}

export class CreateUserResponseDto {
  constructor(partial: Partial<CreateUserResponseDto>) {
    Object.assign(this, partial);
  }
  @ApiProperty({
    example: 'New Account added successfully',
    required: true,
  })
  message: string = 'New Account added successfully';

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
