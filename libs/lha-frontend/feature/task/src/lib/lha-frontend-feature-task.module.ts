import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';
import { LhaFrontendFeatureTaskExecutionListModule } from '@lighthouse-automation/lha-frontend/feature/task-execution-list';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    NgChartsModule,
    LhaFrontendFeatureTaskExecutionListModule,
  ],
  declarations: [TaskComponent, TaskComponent],
  exports: [TaskComponent],
})
export class LhaFrontendFeatureTaskModule {}
