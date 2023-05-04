import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as TaskExecutionActions from './task-execution.actions';
import { TaskExecutionEffects } from './task-execution.effects';
import { TaskExecutionFacade } from './task-execution.facade';
import { TaskExecutionEntity } from './task-execution.models';
import {
  TASK_EXECUTION_FEATURE_KEY,
  TaskExecutionState,
  initialTaskExecutionState,
  taskExecutionReducer,
} from './task-execution.reducer';
import * as TaskExecutionSelectors from './task-execution.selectors';

interface TestSchema {
  taskExecution: TaskExecutionState;
}

describe('TaskExecutionFacade', () => {
  let facade: TaskExecutionFacade;
  let store: Store<TestSchema>;
  const createTaskExecutionEntity = (
    id: string,
    name = ''
  ): TaskExecutionEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            TASK_EXECUTION_FEATURE_KEY,
            taskExecutionReducer
          ),
          EffectsModule.forFeature([TaskExecutionEffects]),
        ],
        providers: [TaskExecutionFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TaskExecutionFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTaskExecution$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTaskExecution$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTaskExecutionSuccess` to manually update list
     */
    it('allTaskExecution$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTaskExecution$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TaskExecutionActions.loadTaskExecutionSuccess({
          taskExecution: [
            createTaskExecutionEntity('AAA'),
            createTaskExecutionEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allTaskExecution$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
