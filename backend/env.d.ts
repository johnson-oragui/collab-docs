declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'staging' | 'test';
    PORT: number;

    MONGODB_URI: string;
    DB_NAME: string;

    JWT_SECRET: string;
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    JWT_EXPIRY: string;
  }
}
