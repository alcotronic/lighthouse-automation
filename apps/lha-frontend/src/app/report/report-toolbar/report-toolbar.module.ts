import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportToolbarComponent } from './report-toolbar.component';
import { RouterModule } from '@angular/router';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { RoleModule } from '../../role/role.module';
import { LhaFrontendApiAuthenticationModule } from '@lighthouse-automation/lha-frontend/api/authentication';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialImportModule,
    RoleModule,
    LhaFrontendApiAuthenticationModule
  ],
  declarations: [ReportToolbarComponent],
  exports: [ReportToolbarComponent]
})
export class ReportToolbarModule {}
