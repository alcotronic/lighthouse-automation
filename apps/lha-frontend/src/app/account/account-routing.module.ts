import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountComponent } from './account.component';

const accountRoutes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'settings',
        component: AccountSettingsComponent,
        canActivate: [AuthGuard],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
