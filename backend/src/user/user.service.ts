import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import { PasswordService } from '../password/password.service';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  UserResponseEntity,
} from './dto/user.create.dto';
import { ObjectId } from 'mongodb';
import { plainToInstance } from 'class-transformer';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async signup(
    createDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const hashPass = await this.passwordService.hash(createDto.password);
    const name =
      createDto.firstname && createDto.lastname
        ? `${createDto.firstname} ${createDto.lastname}`
        : createDto.firstname
          ? `${createDto.firstname}`
          : createDto.lastname
            ? `${createDto.lastname}`
            : '';

    const newUser = await this.userRepository.create({
      password: hashPass,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: createDto.email.toLowerCase(),
      _id: new ObjectId(),
      role: 'user',
      acceptTerms: createDto.acceptTerms,
    });

    const sanitizedData = plainToInstance(UserResponseEntity, newUser, {
      excludeExtraneousValues: true,
    });

    return new CreateUserResponseDto({
      data: sanitizedData,
    });
  }
}
