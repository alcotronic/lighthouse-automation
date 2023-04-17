import { BullModule } from '@nestjs/bull';
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LhaBackendAuthenticationModule } from '@lighthouse-automation/lha-backend/authentication';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';
import { LhaBackendSetupModule } from '@lighthouse-automation/lha-backend/setup';
import { TaskModule } from './task/task.module';
import { ReportModule } from './report/report.module';
import { TaskExecutionModule } from './task-execution/task-execution.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/lha-backend/.development.env',
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DBNAME'),
        user: configService.get<string>('MONGODB_DB_USER'),
        pass: configService.get<string>('MONGODB_DB_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: configService.get<string>('JWT_SIGN_OPTIONS_EXPIRES_IN'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    ScheduleModule.forRoot(),
    LhaBackendAuthenticationModule,
    LhaBackendSetupModule,
    LhaBackendUserModule,
    QueueModule,
    ReportModule,
    TaskModule,
    TaskExecutionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
