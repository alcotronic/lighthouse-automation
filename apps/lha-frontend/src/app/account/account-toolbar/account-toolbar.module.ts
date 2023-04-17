import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountToolbarComponent } from './account-toolbar.component';
import { RouterModule } from '@angular/router';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { LhaFrontendApiRoleModule } from '@lighthouse-automation/lha-frontend/api/role';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialImportModule,
    LhaFrontendApiRoleModule
  ],
  declarations: [AccountToolbarComponent],
  exports: [AccountToolbarComponent]
})
export class AccountToolbarModule { }
