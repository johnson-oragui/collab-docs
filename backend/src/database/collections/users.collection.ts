import { Collection, Db } from 'mongodb';
import { UserDocument } from '../schemas/user.schema';

export class UsersCollection {
  private collection: Collection<UserDocument>;

  constructor(db: Db) {
    this.collection = db.collection<UserDocument>('cd_users');
  }

  getCollection() {
    return this.collection;
  }
}
