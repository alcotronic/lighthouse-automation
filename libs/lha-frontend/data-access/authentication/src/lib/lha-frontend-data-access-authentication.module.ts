import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationService } from './service/authentication.service';
import * as fromAuthentication from './+state/authentication.reducer';
import { AuthenticationEffects } from './+state/authentication.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAuthentication.AUTHENTICATION_FEATURE_KEY,
      fromAuthentication.authenticationReducer
    ),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  providers: [AuthenticationService],
})
export class LhaFrontendDataAccessAuthenticationModule {}
