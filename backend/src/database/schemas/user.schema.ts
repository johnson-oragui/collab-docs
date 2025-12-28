import { ObjectId } from 'mongodb';

export interface UserDocument {
  _id: ObjectId;
  name?: string | null;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
