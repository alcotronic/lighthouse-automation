import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user/create',
        component: UserCreateComponent,
        canActivate: [AuthGuard],
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class LhaFrontendFeatureAdminRoutingModule {}
