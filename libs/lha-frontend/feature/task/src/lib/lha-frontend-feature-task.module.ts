import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule],
  declarations: [TaskComponent, TaskComponent],
  exports: [TaskComponent],
})
export class LhaFrontendFeatureTaskModule {}
