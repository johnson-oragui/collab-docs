import { Db } from 'mongodb';

export const up = async (db: Db) => {
  // check email duplicates before index creation on email
  const duplicates = await db
    .collection('cd_users')
    .aggregate([
      { $group: { _id: '$email', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
    ])
    .toArray();

  if (duplicates.length) {
    throw new Error('Duplicate emails exist; cannot create unique index');
  }
  // Create unique index on email
  await db.collection('cd_users').createIndex(
    { email: 1 },
    {
      unique: true,
      sparse: false, // Do not allows null values
      name: 'email_unique_index',
    },
  );

  // Create compound index
  await db
    .collection('cd_users')
    .createIndex({ name: 1, createdAt: -1 }, { name: 'name_created_at_index' });

  console.log('Created indexes on users collection');
};

export const down = async (db: Db) => {
  await db.collection('cd_users').dropIndex('email_unique_index');
  await db.collection('cd_users').dropIndex('name_created_at_index');
  console.log('Dropped indexes from users collection');
};
