import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTaskRunComponent } from './report-task-run.component';
import { ReportTaskJobListModule } from '../report-task-job-list/report-task-job-list.module';
import { MaterialImportModule } from '../../material-import/material-import.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportModule,
    ReportTaskJobListModule,
  ],
  declarations: [ReportTaskRunComponent],
})
export class ReportTaskRunModule {}
