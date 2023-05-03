import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as TaskActions from './task.actions';
import { TaskEffects } from './task.effects';
import { TaskFacade } from './task.facade';
import { TaskEntity } from './task.models';
import {
  TASK_FEATURE_KEY,
  TaskState,
  initialTaskState,
  taskReducer,
} from './task.reducer';
import * as TaskSelectors from './task.selectors';

interface TestSchema {
  task: TaskState;
}

describe('TaskFacade', () => {
  let facade: TaskFacade;
  let store: Store<TestSchema>;
  const createTaskEntity = (id: string, name = ''): TaskEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TASK_FEATURE_KEY, taskReducer),
          EffectsModule.forFeature([TaskEffects]),
        ],
        providers: [TaskFacade],
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
      facade = TestBed.inject(TaskFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTask$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTask$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTaskSuccess` to manually update list
     */
    it('allTask$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTask$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TaskActions.loadTaskSuccess({
          task: [createTaskEntity('AAA'), createTaskEntity('BBB')],
        })
      );

      list = await readFirst(facade.allTask$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
