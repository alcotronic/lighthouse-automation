import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './service/task.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTask from './+state/task.reducer';
import { TaskEffects } from './+state/task.effects';
import { TaskFacade } from './+state/task.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTask.TASK_FEATURE_KEY, fromTask.taskReducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
  providers: [TaskFacade, TaskService],
})
export class LhaFrontendDataAccessTaskModule {}
