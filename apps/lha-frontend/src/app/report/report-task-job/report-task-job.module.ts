import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTaskJobComponent } from './report-task-job.component';
import { MaterialImportModule } from '../../material-import/material-import.module';
import { ReportTaskJobService } from './report-task-job.service';

@NgModule({
  imports: [CommonModule, MaterialImportModule],
  declarations: [ReportTaskJobComponent],
  providers: [ReportTaskJobService],
  exports: [ReportTaskJobComponent],
})
export class ReportTaskJobModule {}
