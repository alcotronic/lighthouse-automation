import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './service/authentication.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthenticationService],
})
export class LhaFrontendDataAccessAuthenticationModule {}
