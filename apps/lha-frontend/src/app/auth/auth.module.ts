import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { LhaFrontendApiAuthenticationModule } from '@lighthouse-automation/lha-frontend/api/authentication';
import { LhaFrontendApiRoleModule } from '@lighthouse-automation/lha-frontend/api/role';


@NgModule({
  imports: [
    CommonModule,
    LhaFrontendApiAuthenticationModule,
    LhaFrontendApiRoleModule
  ],
  declarations: [],
  providers: [AuthGuard],
})
export class AuthModule {}
