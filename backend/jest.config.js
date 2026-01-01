module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  roots: ['<rootDir>/src', '<rootDir>/test'],

  testMatch: [
    '**/?(*.)+(spec|test).ts'
  ],

  testTimeout: 30000,
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFiles: ['<rootDir>/test/jest.setup.ts'],

  transformIgnorePatterns: [
    'node_modules/(?!(uuid)/)',
  ],
  forceExit: true,
  detectOpenHandles: true,
};
