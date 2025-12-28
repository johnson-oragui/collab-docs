import { Module } from '@nestjs/common';
import UserRepository from './user.repository';
import UserService from './user.service';
import UserController from './user.controller';

@Module({
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export default class UserModule {}
