import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ReportTaskJobListComponent } from './report-task-job-list.component';
import { ReportTaskJobModule } from '../report-task-job/report-task-job.module';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    ReportTaskJobModule
  ],
  declarations: [ReportTaskJobListComponent],
  exports: [ReportTaskJobListComponent]
})
export class ReportTaskJobListModule {

}
