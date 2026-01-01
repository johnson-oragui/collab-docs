import { MongoClient, Db, ServerApiVersion } from 'mongodb';

describe('Users collection', () => {
  let client: MongoClient;
  let db: Db;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    db = client.db(dbName);
  });

  afterAll(async () => {
    if (db) {
      await db
        .collection('cd_users')
        .deleteOne(
          { email: 'test@example.com' },
          { comment: `RID: userCollection test` },
        );
      await db
        .collection('cd_users')
        .deleteOne(
          { email: 'unique@example.com' },
          { comment: `RID: userCollection test` },
        );
    }
    if (client) await client.close();
  });

  it('should insert and fetch a valid user', async () => {
    const result = await db.collection('cd_users').insertOne({
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await db
      .collection('cd_users')
      .findOne(
        { _id: result.insertedId },
        { comment: `RID: userCollection test` },
      );

    expect(user).toBeDefined();
    expect(user?.email).toBe('test@example.com');
  });

  it('should reject invalid user (missing email)', async () => {
    await expect(
      db.collection('cd_users').insertOne(
        {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { comment: `RID: userCollection test` },
      ),
    ).rejects.toThrow();
  });

  it('should enforce unique email index', async () => {
    await db.collection('cd_users').insertOne(
      {
        email: 'unique@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { comment: `RID: userCollection test` },
    );

    await expect(
      db.collection('cd_users').insertOne(
        {
          email: 'unique@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { comment: `RID: userCollection test` },
      ),
    ).rejects.toThrow();
  });
});
