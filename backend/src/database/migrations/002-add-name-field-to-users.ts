import { Db } from 'mongodb';

export const up = async (db: Db) => {
  // Relax validation
  await db.command({
    collMod: 'cd_users',
    validationAction: 'warn',
  });

  // Add default value for existing documents
  await db
    .collection('cd_users')
    .updateMany({ name: { $exists: false } }, { $set: { name: null } });

  // Enforce new schema
  await db.command({
    collMod: 'cd_users',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['createdAt', 'updatedAt', 'email'],
        properties: {
          schemaVersion: {
            bsonType: 'int',
            enum: [2],
          },
          name: {
            bsonType: 'string',
            description: 'must be a string',
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
    validationLevel: 'strict',
    validationAction: 'error',
  });

  console.log('Added name field to users collection');
};

export const down = async (db: Db) => {
  // Remove name field from schema
  await db.command({
    collMod: 'cd_users',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['email', 'createdAt', 'updatedAt'],
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

  console.log('Removed name field from users collection');
};
