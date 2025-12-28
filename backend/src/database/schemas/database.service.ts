import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { UsersCollection } from '../collections/users.collection';

// for dev
@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject('MONGO_CLIENT') private readonly client: MongoClient) {}
  private db: Db;

  public users: UsersCollection;

  onModuleInit() {
    this.connect();
    this.initCollections();
  }

  private connect() {
    this.db = this.client.db();
  }

  private initCollections() {
    this.users = new UsersCollection(this.db);
  }

  getDb(): Db {
    return this.db;
  }

  async close() {
    await this.client.close();
  }
}
