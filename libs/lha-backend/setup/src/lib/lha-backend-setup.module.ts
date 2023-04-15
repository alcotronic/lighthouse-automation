import { Module } from '@nestjs/common';

import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';

import { SetupController } from './controller/setup.controller'

@Module({
  imports: [LhaBackendUserModule],
  controllers: [SetupController],
  providers: [],
  exports: [],
})
export class LhaBackendSetupModule {}
