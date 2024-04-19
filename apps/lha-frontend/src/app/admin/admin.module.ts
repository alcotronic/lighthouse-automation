import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    DashboardModule,
  ],
  declarations: [AdminComponent, AdminToolbarComponent, UserCreateComponent, UserListComponent],
  providers: [UserService]
})
export class AdminModule {}
