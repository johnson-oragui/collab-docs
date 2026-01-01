import { Module } from '@nestjs/common';
import UserRepository from './user.repository';
import UserService from './user.service';
import UserController from './user.controller';
import { PasswordModule } from '../password/password.module';
import { CustomJwtModule } from '../jwt-service/jwt.module';
import { IsEMailUniqueConstraint } from './dto/user-custom-validator/uniqueEmail.validator';

@Module({
  providers: [UserRepository, UserService, IsEMailUniqueConstraint],
  controllers: [UserController],
  exports: [UserService, UserRepository, IsEMailUniqueConstraint],
  imports: [PasswordModule, CustomJwtModule],
})
export default class UserModule {}
