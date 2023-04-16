import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { MaterialImportModule } from '../material-import/material-import.module';
import { ReportRoutingModule } from './report-routing.module';
import { ReportTaskModule } from './report-task/report-task.module';
import { ReportToolbarModule } from './report-toolbar/report-toolbar.module';
import { ReportTaskCreateModule } from './report-task-create/report-task-create.module';
import { ReportTaskEditModule } from './report-task-edit/report-task-edit.module';
import { ReportTaskJobModule } from './report-task-job/report-task-job.module';
import { ReportTaskJobListModule } from './report-task-job-list/report-task-job-list.module';
import { ReportTaskRunModule } from './report-task-run/report-task-run.module';
import { ReportTaskRunListModule } from './report-task-run-list/report-task-run-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportTaskListModule } from './report-task-list/report-task-list.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReportRoutingModule,
    ReportTaskModule,
    ReportTaskListModule,
    ReportTaskCreateModule,
    ReportTaskEditModule,
    ReportTaskJobModule,
    ReportTaskJobListModule,
    ReportTaskRunModule,
    ReportTaskRunListModule,
    ReportToolbarModule,
  ],
  declarations: [ReportComponent],
})
export class ReportModule {}
