import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';

@Injectable()
export default class UserService {
  constructor(userRepository: UserRepository) {}
}
