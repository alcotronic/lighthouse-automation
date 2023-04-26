import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { LhaFrontendDataAccessTaskExecutionModule } from '@lighthouse-automation/lha-frontend/data-access/task-execution';
import { TaskExecutionListComponent } from './task-execution-list/task-execution-list.component';

@NgModule({
  imports: [CommonModule, MatListModule, LhaFrontendDataAccessTaskExecutionModule],
  declarations: [TaskExecutionListComponent],
  exports: [TaskExecutionListComponent],
})
export class LhaFrontendFeatureTaskExecutionListModule {}
