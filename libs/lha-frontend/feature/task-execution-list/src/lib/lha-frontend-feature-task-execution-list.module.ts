import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { LhaFrontendApiTaskExecutionModule } from '@lighthouse-automation/lha-frontend/api/task-execution';
import { TaskExecutionListComponent } from './task-execution-list/task-execution-list.component';

@NgModule({
  imports: [CommonModule, MatListModule, LhaFrontendApiTaskExecutionModule],
  declarations: [TaskExecutionListComponent],
  exports: [TaskExecutionListComponent]
})
export class LhaFrontendFeatureTaskExecutionListModule {}
