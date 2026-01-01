import { Db, MongoClient } from 'mongodb';
import UserRepository from '../../src/user/user.repository';
import { UserDocument } from '../../src/database/schemas/user.schema';

describe('UserRepository', () => {
  let client: MongoClient;
  let db: Db;
  let repository: UserRepository;

  const userEmail1 = 'userrep1@example.com';

  beforeAll(async () => {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    db = client.db(process.env.DB_NAME);
    repository = new UserRepository(db);
  }, 50_000);

  afterAll(async () => {
    if (db) {
      await db
        .collection('cd_users')
        .deleteOne(
          { email: userEmail1 },
          { comment: `RID: userRepository test` },
        );
    }
    if (client) await client.close();
  }, 40_000);

  it('should create a user', async () => {
    const userData: Omit<UserDocument, '_id'> = {
      email: userEmail1,
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = repository.create(userData as UserDocument);

    expect((await result)._id).toBeDefined();

    expect((await result).email).toBe(userEmail1);
  });

  it('should find user by email', async () => {
    const user = await repository.findByEmail(userEmail1);

    expect(user).not.toBeNull();
    expect(user!.email).toBe(userEmail1);
  });

  it('should update a user', async () => {
    const created = await repository.findByEmail(userEmail1);

    expect(created?._id).toBeDefined();
    const updated = await repository.update(created?._id.toHexString() || '', {
      email: 'updated@test.com',
    });

    expect(updated).not.toBeNull();
    // console.log('updated: ', updated);
    expect(updated!.email).toBe('updated@test.com');
  });

  it('should delete a user', async () => {
    const created = await repository.findByEmail('updated@test.com');
    const deleted = await repository.delete(created?._id.toHexString() || '');

    expect(deleted).toBe(true);

    const found = await repository.findById(created?._id.toHexString() || '');
    expect(found).toBeNull();
  });
});
