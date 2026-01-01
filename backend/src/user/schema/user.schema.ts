import { Document, ObjectId } from 'mongodb';

export interface UserSchema extends Document {
  id: ObjectId;
  name?: string | null;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  acceptTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserClassSchema implements UserSchema {
  id: ObjectId;
  name?: string | null | undefined;
  password?: string | undefined;
  role?: 'user' | 'admin' | undefined;
  acceptTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
  email: string;

  constructor(partial: Partial<UserClassSchema>) {
    Object.assign(this, partial);
  }
}
