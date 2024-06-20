import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LhaBackendDatabaseMongodbModule } from '@lighthouse-automation/backend/database-mongodb';
import { LhaBackendDatabaseRedisModule } from '@lighthouse-automation/backend/database-redis';
import { LhaBackendAuthenticationModule } from '@lighthouse-automation/backend/authentication';
import { LhaBackendUserModule } from '@lighthouse-automation/backend/user';
import { LhaBackendSetupModule } from '@lighthouse-automation/backend/setup';
import { LhaBackendRoleModule } from '@lighthouse-automation/backend/role';
// import { LhaBackendAverageScoreUpdaterQueueModule } from '@lighthouse-automation/backend/queue/average-score-update-queue';
// import { LhaBackendAverageScoreUpdaterQueueModule } from '@lighthouse-automation/backend/queue/execution-score-update-queue';
// import { LhaBackendAverageScoreUpdaterQueueModule } from '@lighthouse-automation/backend/queue/report-generate-queue';
import { LhaBackendReportModule } from '@lighthouse-automation/backend/report';
import { LhaBackendTaskModule } from '@lighthouse-automation/backend/task';
import { LhaBackendTaskExecutionModule } from '@lighthouse-automation/backend/task-execution';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/backend/.development.env',
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ScheduleModule.forRoot(),
    LhaBackendDatabaseMongodbModule,
    LhaBackendDatabaseRedisModule,
    LhaBackendAuthenticationModule,
    LhaBackendSetupModule,
    LhaBackendUserModule,
    LhaBackendRoleModule,
    //LhaBackendAverageScoreUpdaterQueueModule,
    LhaBackendReportModule,
    LhaBackendTaskModule,
    LhaBackendTaskExecutionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
