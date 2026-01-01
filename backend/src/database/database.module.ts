import { Global, Logger, Module } from '@nestjs/common';
import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('Database Module');

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI') as string;
        const client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
        });
        await client.connect();

        return client;
      },
      inject: [ConfigService],
    },
    {
      provide: 'DB',
      useFactory: async (
        client: MongoClient,
        configService: ConfigService,
      ): Promise<Db> => {
        const dbName = configService.get<string>('DB_NAME') as string;
        const db = client.db(dbName);
        await db.command({ ping: 1 });
        logger.log('Deployment ping!. successful connection to MongoDB!');
        return db;
      },
      inject: ['MONGO_CLIENT', ConfigService],
    },
  ],
  exports: ['MONGO_CLIENT', 'DB'],
})
export class MongoDbModule {}
