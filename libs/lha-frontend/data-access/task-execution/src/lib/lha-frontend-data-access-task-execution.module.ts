import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskExecutionService } from './service/task-ececution.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTaskExecution from './+state/task-execution.reducer';
import { TaskExecutionEffects } from './+state/task-execution.effects';
import { TaskExecutionFacade } from './+state/task-execution.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTaskExecution.TASK_EXECUTION_FEATURE_KEY,
      fromTaskExecution.taskExecutionReducer
    ),
    EffectsModule.forFeature([TaskExecutionEffects]),
  ],
  providers: [TaskExecutionService, TaskExecutionFacade],
})
export class LhaFrontendDataAccessTaskExecutionModule {}
