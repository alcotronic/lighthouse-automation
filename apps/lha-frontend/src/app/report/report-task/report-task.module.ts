import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ReportTaskComponent } from './report-task.component';
import { ReportTaskService } from './report-task.service';
import { ReportTaskRunListModule } from '../report-task-run-list/report-task-run-list.module';
import { MaterialImportModule } from '../../material-import/material-import.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportModule,
    NgChartsModule,
    ReportTaskRunListModule,
  ],
  declarations: [ReportTaskComponent],
  providers: [ReportTaskService],
})
export class ReportTaskModule {}
