import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTaskListComponent } from './report-task-list.component';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { LhaFrontendApiTaskModule } from '@lighthouse-automation/lha-frontend/api/task';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportModule,
    LhaFrontendApiTaskModule
  ],
  declarations: [ReportTaskListComponent]
})
export class ReportTaskListModule {}
