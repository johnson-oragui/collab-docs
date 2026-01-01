import { Document, ObjectId } from 'mongodb';

export interface UserDocument extends Document {
  _id: ObjectId;
  name?: string | null;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  acceptTerms?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
