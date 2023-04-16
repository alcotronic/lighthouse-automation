import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { LhaFrontendApiAuthenticationModule } from '@lighthouse-automation/lha-frontend/api/authentication';

@NgModule({
  imports: [
    CommonModule,
    LhaFrontendApiAuthenticationModule
  ],
  declarations: [],
  providers: [AuthGuard],
})
export class AuthModule {}
