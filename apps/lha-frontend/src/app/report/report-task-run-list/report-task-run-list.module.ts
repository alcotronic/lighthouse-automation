import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTaskRunListComponent } from './report-task-run-list.component';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { ReportTaskRunModule } from '../report-task-run/report-task-run.module';

@NgModule({
  imports: [CommonModule, MaterialImportModule, ReportTaskRunModule],
  exports: [ReportTaskRunListComponent],
  declarations: [ReportTaskRunListComponent],
})
export class ReportTaskRunListModule {}
