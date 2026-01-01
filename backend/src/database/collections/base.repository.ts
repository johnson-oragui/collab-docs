import {
  Collection,
  Db,
  Document,
  Filter,
  MongoServerError,
  ObjectId,
  OptionalUnlessRequiredId,
  WithId,
} from 'mongodb';
import { asyncStore } from '../../commons/storage/async-storage';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseRepository<T extends Document> {
  protected collection: Collection<T>;

  protected constructor(
    protected readonly db: Db,
    collectionName: string,
  ) {
    this.collection = db.collection<T>(collectionName);
  }

  protected getRequestId(): string {
    return asyncStore.getStore()?.requestId || 'unknown';
  }

  async findAll(): Promise<WithId<T>[]> {
    return await this.collection
      .find({}, { comment: `RID: ${this.getRequestId()}` })
      .toArray();
  }

  async findById(id: string) {
    const userExists = await this.collection.findOne(
      { _id: new ObjectId(id) } as Filter<T>,
      {
        comment: `RID: ${this.getRequestId()}`,
      },
    );

    if (!userExists) return null;

    const { _id, ...rest } = userExists;

    return { ...rest, id: _id };
  }

  async create(data: OptionalUnlessRequiredId<T>) {
    try {
      const result = await this.collection.insertOne(data, {
        comment: `RID: ${this.getRequestId()}`,
      });
      return { ...data, id: result.insertedId };
    } catch (error) {
      if (error instanceof MongoServerError) {
        if (error.errorResponse.code === 11000) {
          // email constraint
          throw new HttpException(
            {
              message: 'Email already in use',
              success: false,
              error: 'conflict',
              statusCode: HttpStatus.CONFLICT,
            },
            HttpStatus.CONFLICT,
          );
        }
      }
      // console.log('Error: ', JSON.stringify(error));
      throw error;
    }
  }

  async update(id: string, data: Partial<T>) {
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) } as Filter<T>,
      { $set: data },
      { returnDocument: 'after', comment: `RID: ${this.getRequestId()}` },
    );
    return result ? result : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne(
      {
        _id: new ObjectId(id),
      } as Filter<T>,
      { comment: `RID: ${this.getRequestId()}` },
    );
    return result.deletedCount > 0;
  }

  async deleteMany(filter: Filter<T>) {
    const res = await this.collection.deleteMany(filter);
    return res;
  }
}
