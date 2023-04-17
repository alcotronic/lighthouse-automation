import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ReportTaskComponent } from './report-task.component';
import { ReportTaskRunListModule } from '../report-task-run-list/report-task-run-list.module';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { LhaFrontendApiTaskModule } from '@lighthouse-automation/lha-frontend/api/task';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportModule,
    NgChartsModule,
    LhaFrontendApiTaskModule,
    ReportTaskRunListModule,
  ],
  declarations: [ReportTaskComponent],
})
export class ReportTaskModule {}
