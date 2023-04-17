import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import localeDE from '@angular/common/locales/de';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupModule } from './setup/setup.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { ReportModule } from './report/report.module';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';
import { LhaFrontendApiAuthenticationModule } from '@lighthouse-automation/lha-frontend/api/authentication';
import { LhaFrontendApiStatusModule } from '@lighthouse-automation/lha-frontend/api/status';
import { LhaFrontendApiRoleModule } from '@lighthouse-automation/lha-frontend/api/role';
import { LhaFrontendFeatureToolbarModule } from '@lighthouse-automation/lha-frontend/feature/toolbar';
import { TaskModule } from './task/task.module';


export function tokenGetter() {
  return localStorage.getItem('access_token');
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
    ReportModule,
    LhaFrontendApiAuthenticationModule,
    LhaFrontendApiRoleModule,
    LhaFrontendApiStatusModule,
    LhaFrontendFeatureToolbarModule,
    SetupModule,
    LoginModule,
    TaskModule
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
