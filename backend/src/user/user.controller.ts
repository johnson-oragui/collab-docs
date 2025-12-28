import { Controller } from '@nestjs/common';
import UserService from './user.service';

@Controller('api/v1/users')
export default class UserController {
  constructor(userService: UserService) {}
}
