import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, isDevMode } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import localeDE from '@angular/common/locales/de';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LhaFrontendDataAccessAuthenticationModule } from '@lighthouse-automation/frontend/data-access/authentication';
import { LhaFrontendDataAccessStatusModule } from '@lighthouse-automation/frontend/data-access/status';
import { LhaFrontendDataAccessRoleModule } from '@lighthouse-automation/frontend/data-access/role';

import { LhaFrontendFeatureAccountRoutingModule } from '@lighthouse-automation/frontend/feature/account-routing';
import { LhaFrontendFeatureAccountSettingsModule } from '@lighthouse-automation/frontend/feature/account-settings';
import { LhaFrontendFeatureLoginModule } from '@lighthouse-automation/frontend/feature/login';
import { LhaFrontendFeatureSetupModule } from '@lighthouse-automation/frontend/feature/setup';
import { LhaFrontendFeatureToolbarModule } from '@lighthouse-automation/frontend/feature/toolbar';
import { LhaFrontendFeatureTaskModule } from '@lighthouse-automation/frontend/feature/task';
import { LhaFrontendFeatureTaskRoutingModule } from '@lighthouse-automation/frontend/feature/task-routing';

import { LhaFrontendDataAccessTaskModule } from '@lighthouse-automation/frontend/data-access/task';
import { LhaFrontendDataAccessTaskExecutionModule } from '@lighthouse-automation/frontend/data-access/task-execution';
import { LhaFrontendDataAccessReportModule } from '@lighthouse-automation/frontend/data-access/report';

export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

registerLocaleData(localeDE);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/api/auth'],
      },
    }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    LhaFrontendDataAccessAuthenticationModule,
    LhaFrontendDataAccessRoleModule,
    LhaFrontendDataAccessReportModule,
    LhaFrontendDataAccessTaskModule,
    LhaFrontendDataAccessTaskExecutionModule,
    LhaFrontendDataAccessStatusModule,
    LhaFrontendFeatureAccountRoutingModule,
    LhaFrontendFeatureAccountSettingsModule,
    LhaFrontendFeatureLoginModule,
    LhaFrontendFeatureSetupModule,
    LhaFrontendFeatureToolbarModule,
    LhaFrontendFeatureTaskModule,
    LhaFrontendFeatureTaskRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
