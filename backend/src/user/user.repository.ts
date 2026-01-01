import { Inject, Injectable } from '@nestjs/common';
import { Db, WithId } from 'mongodb';
import { BaseRepository } from '../database/collections/base.repository';
import { UserDocument } from '../database/schemas/user.schema';

@Injectable()
export default class UserRepository extends BaseRepository<UserDocument> {
  constructor(@Inject('DB') protected readonly db: Db) {
    super(db, 'cd_users');
  }

  async findByEmail(email: string): Promise<WithId<UserDocument> | null> {
    // console.log('running find by email...');
    return this.collection.findOne({ email });
  }
}
