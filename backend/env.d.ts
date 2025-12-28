declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'staging' | 'test';
    PORT: number;

    MONGODB_URI: string;
    DB_NAME: string;
  }
}
