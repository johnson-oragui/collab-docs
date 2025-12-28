import { Db } from 'mongodb';

export const up = async (db: Db) => {
  await db.createCollection('cd_users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['createdAt', 'updatedAt', 'email'],
        properties: {
          schemaVersion: {
            bsonType: 'int',
            enum: [1],
          },
          email: {
            bsonType: 'string',
            pattern: '^\\S+@\\S+\\.\\S+$',
            description: 'must be a valid email address and is required',
          },
          password: {
            bsonType: 'string',
            description: 'must be a string',
          },
          createdAt: {
            bsonType: 'date',
            description: 'must be a date and is required',
          },
          updatedAt: {
            bsonType: 'date',
            description: 'must be a date and is required',
          },
        },
      },
    },
  });

  console.log('✅ Created users collection');
};

export const down = async (db: Db) => {
  await db.dropCollection('cd_users');
  console.log('❌ Dropped users collection');
};
