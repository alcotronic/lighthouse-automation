import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';

@Module({
  imports: [
    BullModule,
    LhaBackendUserModule
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
