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
    .updateMany({ role: { $exists: false } }, { $set: { role: null } });
  await db
    .collection('cd_users')
    .updateMany(
      { accepTerms: { $exists: false } },
      { $set: { accepTerms: true } },
    );

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
            enum: [3],
          },
          name: {
            bsonType: 'string',
            description: 'must be a string',
          },
          role: {
            bsonType: 'string',
            description: 'must be a string',
          },
          acceptTerms: {
            bsonType: 'bool',
            description: 'must be a boolean',
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

  console.log('Added role and acceptTerm fields to users collection');
};

export const down = async (db: Db) => {
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

  console.log('Removed role and acceptTerms fields from users collection');
};
