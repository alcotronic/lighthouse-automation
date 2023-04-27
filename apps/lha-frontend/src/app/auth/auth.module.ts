import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { LhaFrontendDataAccessAuthenticationModule } from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { LhaFrontendDataAccessRoleModule } from '@lighthouse-automation/lha-frontend/data-access/role';

@NgModule({
  imports: [
    CommonModule,
    LhaFrontendDataAccessAuthenticationModule,
    LhaFrontendDataAccessRoleModule,
  ],
  declarations: [],
  providers: [],
})
export class AuthModule {}
