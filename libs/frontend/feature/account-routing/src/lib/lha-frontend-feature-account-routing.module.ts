import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@lighthouse-automation/frontend/data-access/authentication';
import { AccountSettingsComponent } from '@lighthouse-automation/frontend/feature/account-settings';

const accountRoutes: Routes = [
  {
    path: 'account',
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
export class LhaFrontendFeatureAccountRoutingModule {}
