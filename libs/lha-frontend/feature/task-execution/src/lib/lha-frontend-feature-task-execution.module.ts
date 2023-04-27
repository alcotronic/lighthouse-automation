import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TaskExecutionComponent } from './task-execution/task-execution.component';
import { LhaFrontendFeatureReportListModule } from '@lighthouse-automation/lha-frontend/feature/report-list';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule, MatListModule, LhaFrontendFeatureReportListModule],
  declarations: [TaskExecutionComponent],
  exports: [TaskExecutionComponent],
})
export class LhaFrontendFeatureTaskExecutionModule {}
