import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LhaBackendDatabaseMongodbModule } from '@lighthouse-automation/lha-backend/database-mongodb';
import { LhaBackendDatabaseRedisModule } from '@lighthouse-automation/lha-backend/database-redis';
import { LhaBackendAuthenticationModule } from '@lighthouse-automation/lha-backend/authentication';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';
import { LhaBackendSetupModule } from '@lighthouse-automation/lha-backend/setup';
import { LhaBackendRoleModule } from '@lighthouse-automation/lha-backend/role';
import { LhaBackendAverageScoreUpdaterQueueModule } from '@lighthouse-automation/lha-backend/queue/average-score-update-queue';
import { LhaBackendAverageScoreUpdaterQueueModule } from '@lighthouse-automation/lha-backend/queue/execution-score-update-queue';
import { LhaBackendAverageScoreUpdaterQueueModule } from '@lighthouse-automation/lha-backend/queue/report-generate-queue';
import { LhaBackendReportModule } from '@lighthouse-automation/lha-backend/report';
import { LhaBackendTaskModule } from '@lighthouse-automation/lha-backend/task';
import { LhaBackendTaskExecutionModule } from '@lighthouse-automation/lha-backend/task-execution';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/lha-backend/.development.env',
    }),
    ScheduleModule.forRoot(),
    LhaBackendDatabaseMongodbModule,
    LhaBackendDatabaseRedisModule,
    LhaBackendAuthenticationModule,
    LhaBackendSetupModule,
    LhaBackendUserModule,
    LhaBackendRoleModule,
    LhaBackendAverageScoreUpdaterQueueModule,
    LhaBackendReportModule,
    LhaBackendTaskModule,
    LhaBackendTaskExecutionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
