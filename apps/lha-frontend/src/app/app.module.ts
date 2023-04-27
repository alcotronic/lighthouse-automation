import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, isDevMode } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import localeDE from '@angular/common/locales/de';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';
import { LhaFrontendDataAccessAuthenticationModule } from '@lighthouse-automation/lha-frontend/data-access/authentication';
import { LhaFrontendDataAccessStatusModule } from '@lighthouse-automation/lha-frontend/data-access/status';
import { LhaFrontendDataAccessRoleModule } from '@lighthouse-automation/lha-frontend/data-access/role';

import { LhaFrontendFeatureLoginModule } from '@lighthouse-automation/lha-frontend/feature/login';
import { LhaFrontendFeatureSetupModule } from '@lighthouse-automation/lha-frontend/feature/setup';
import { LhaFrontendFeatureToolbarModule } from '@lighthouse-automation/lha-frontend/feature/toolbar';
import { TaskModule } from './task/task.module';

import { LhaFrontendDataAccessTaskModule } from '@lighthouse-automation/lha-frontend/data-access/task';
import { LhaFrontendDataAccessTaskExecutionModule } from '@lighthouse-automation/lha-frontend/data-access/task-execution';
import { LhaFrontendDataAccessReportModule } from '@lighthouse-automation/lha-frontend/data-access/report';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

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
    AuthModule,
    AppRoutingModule,
    AdminModule,
    AccountModule,
    LhaFrontendDataAccessAuthenticationModule,
    LhaFrontendDataAccessRoleModule,
    LhaFrontendDataAccessReportModule,
    LhaFrontendDataAccessTaskModule,
    LhaFrontendDataAccessTaskExecutionModule,
    LhaFrontendDataAccessStatusModule,
    LhaFrontendFeatureLoginModule,
    LhaFrontendFeatureSetupModule,
    LhaFrontendFeatureToolbarModule,
    TaskModule,
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
