import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export default class UserRepository {
  constructor(@Inject('MONGO_CLIENT') private readonly db: Db) {}
}
