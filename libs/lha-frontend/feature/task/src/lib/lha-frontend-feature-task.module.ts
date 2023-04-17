import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { LhaFrontendFeatureTaskExecutionListModule } from '@lighthouse-automation/lha-frontend/feature/task-execution-list';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule, LhaFrontendFeatureTaskExecutionListModule],
  declarations: [TaskComponent, TaskComponent],
  exports: [TaskComponent],
})
export class LhaFrontendFeatureTaskModule {}
