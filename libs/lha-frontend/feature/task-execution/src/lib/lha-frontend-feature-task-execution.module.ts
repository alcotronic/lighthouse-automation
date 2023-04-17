import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TaskExecutionComponent } from './task-execution/task-execution.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule],
  declarations: [TaskExecutionComponent],
  exports: [TaskExecutionComponent],
})
export class LhaFrontendFeatureTaskExecutionModule {}