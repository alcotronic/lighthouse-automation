import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTaskListComponent } from './report-task-list.component';
import { ReportTaskListService } from './report-task-list.service';
import { MaterialImportModule } from '../../material-import/material-import.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportModule,
  ],
  declarations: [ReportTaskListComponent],
  providers: [ReportTaskListService]
})
export class ReportTaskListModule {}
