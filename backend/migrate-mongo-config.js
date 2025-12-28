require('dotenv').config();
console.log('process.env.MONGODB_URI: ', process.env.MONGODB_URI);
module.exports = {
  mongodb: {
    url: process.env.MONGODB_URI,
    databaseName: process.env.DB_NAME,
    
  },
  migrationsDir: 'src/database/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.ts',
  migrationTemplate: 'ts', 
  moduleSystem: 'commonjs',
  options: {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    },
};
