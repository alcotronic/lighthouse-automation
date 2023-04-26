import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountToolbarComponent } from './account-toolbar.component';
import { RouterModule } from '@angular/router';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { LhaFrontendDataAccessRoleModule } from '@lighthouse-automation/lha-frontend/data-access/role';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialImportModule,
    LhaFrontendDataAccessRoleModule,
  ],
  declarations: [AccountToolbarComponent],
  exports: [AccountToolbarComponent],
})
export class AccountToolbarModule {}
