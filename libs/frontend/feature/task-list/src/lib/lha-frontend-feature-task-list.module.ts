import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule, RouterModule],
  declarations: [TaskListComponent],
})
export class LhaFrontendFeatureTaskListModule {}
