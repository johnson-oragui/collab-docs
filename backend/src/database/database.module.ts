import { Global, Module } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI') as string;
        const dbName = configService.get<string>('DB_NAME') as string;
        const client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
        });
        await client.connect();
        await client.db(dbName).command({ ping: 1 });
        console.log(
          'Pinged your deployment. You successfully connected to MongoDB!',
        );
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['MONGO_CLIENT'],
})
export class MongoDbModule {}
