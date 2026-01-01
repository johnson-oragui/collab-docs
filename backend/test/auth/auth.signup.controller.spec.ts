/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { App } from 'supertest/types';
import UserRepository from '../../src/user/user.repository';
import { useContainer } from 'class-validator';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepo: UserRepository;
  const createdUserEmails: string[] = [];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Initialize the container for validators
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    );

    await app.init();

    userRepo = moduleFixture.get(UserRepository);
  }, 50_000);

  afterAll(async () => {
    if (createdUserEmails.length > 0) {
      await userRepo.deleteMany({ email: { $in: createdUserEmails } });
    }
    if (app) {
      await app.close();
    }
  });

  it('should create a new user with valid data', async () => {
    const response = await request(app.getHttpServer() as App)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'StrongPass123#',
        confirmPassword: 'StrongPass123#',
        acceptTerms: true,
        firstname: 'John',
        lastname: 'Doe',
      })
      .set('User-Agent', 'test');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
    expect((response.body as Record<string, any>).data).toHaveProperty(
      'email',
      'test@example.com',
    );
    expect((response.body as Record<string, any>).data).toHaveProperty(
      'name',
      'John Doe',
    );
    expect((response.body as Record<string, any>).data).not.toHaveProperty(
      'password',
    );
    expect((response.body as Record<string, any>).data).not.toHaveProperty(
      'role',
    );
    createdUserEmails.push('test@example.com');
  }, 20_000);

  it('should fail with duplicate email', async () => {
    // First request - create user
    await request(app.getHttpServer() as App)
      .post('/api/v1/auth/signup')
      .send({
        email: 'duplicate@example.com',
        password: 'StrongPass123#',
        confirmPassword: 'StrongPass123#',
        acceptTerms: true,
      })
      .set('User-Agent', 'test')
      .expect(201);

    // Second request - should fail
    request(app.getHttpServer() as App)
      .post('/api/v1/auth/signup')
      .send({
        email: 'duplicate@example.com',
        password: 'StrongPass123#',
        confirmPassword: 'StrongPass123#',
        acceptTerms: true,
      })
      .set('User-Agent', 'test')
      .expect(400)
      .expect((res) => {
        expect((res.body as Record<string, any>).message).toContain(
          'Email already exists',
        );
      });
    createdUserEmails.push('duplicate@example.com');
  });

  it('should fail with invalid email', () => {
    return request(app.getHttpServer() as App)
      .post('/api/v1/auth/signup')
      .send({
        email: 'invalid-email',
        password: 'StrongPass123#',
        confirmPassword: 'StrongPass123#',
        acceptTerms: true,
      })
      .set('User-Agent', 'test')
      .expect(400);
  });

  it('should fail with weak password', () => {
    return request(app.getHttpServer() as App)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test2@example.com',
        password: 'weak',
        confirmPassword: 'weak',
        acceptTerms: true,
      })
      .set('User-Agent', 'test')
      .expect(400);
  });

  it('should fail when passwords do not match', () => {
    return request(app.getHttpServer() as App)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test3@example.com',
        password: 'StrongPass123#',
        confirmPassword: 'DifferentPass123#',
        acceptTerms: true,
      })
      .set('User-Agent', 'test')
      .expect(400);
  });

  it('should fail when acceptTerms is false', () => {
    return request(app.getHttpServer() as App)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test4@example.com',
        password: 'StrongPass123#',
        confirmPassword: 'StrongPass123#',
        acceptTerms: false,
      })
      .set('User-Agent', 'test')
      .expect(400);
  });
});
