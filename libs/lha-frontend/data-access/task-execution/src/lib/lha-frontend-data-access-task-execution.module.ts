import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskExecutionService } from './service/task-ececution.service';

@NgModule({
  imports: [CommonModule],
  providers: [TaskExecutionService],
})
export class LhaFrontendDataAccessTaskExecutionModule {}
