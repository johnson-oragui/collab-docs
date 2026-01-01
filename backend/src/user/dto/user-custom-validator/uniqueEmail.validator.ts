import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import UserRepository from '../../user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEMailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userRepo: UserRepository) {}

  async validate(email: string): Promise<boolean> {
    const emailExists = await this.userRepo.findByEmail(email.toLowerCase());
    // console.log('emailExists: ', emailExists);
    return !emailExists;
  }

  defaultMessage() {
    return 'Email already exists';
  }
}
