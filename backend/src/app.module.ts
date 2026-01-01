import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDbModule } from './database/database.module';
import { validateEnvConfig } from './config/env.validation';
import { LoggerMiddleware } from './commons/middlewares/logging.middleware';
import { CatchAllMiddleware } from './commons/middlewares/catchall.middleware';
import { UserAgentGuard } from './commons/guards/userAgent.guards';
import UserModule from './user/user.module';
import { CustomJwtService } from './jwt-service/jwt.service';
import { CustomJwtModule } from './jwt-service/jwt.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnvConfig }),
    MongoDbModule,
    UserModule,
    CustomJwtModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: UserAgentGuard,
    },
    CustomJwtService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(CatchAllMiddleware).forRoutes('*');
  }
}
