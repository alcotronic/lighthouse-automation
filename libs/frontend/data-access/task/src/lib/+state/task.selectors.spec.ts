import { TaskEntity } from './task.models';
import {
  taskAdapter,
  TaskPartialState,
  initialTaskState,
} from './task.reducer';
import * as TaskSelectors from './task.selectors';

describe('Task Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTaskId = (it: TaskEntity) => it.id;
  const createTaskEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TaskEntity);

  let state: TaskPartialState;

  beforeEach(() => {
    state = {
      task: taskAdapter.setAll(
        [
          createTaskEntity('PRODUCT-AAA'),
          createTaskEntity('PRODUCT-BBB'),
          createTaskEntity('PRODUCT-CCC'),
        ],
        {
          ...initialTaskState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Task Selectors', () => {
    it('selectAllTask() should return the list of Task', () => {
      const results = TaskSelectors.selectAllTask(state);
      const selId = getTaskId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TaskSelectors.selectEntity(state) as TaskEntity;
      const selId = getTaskId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectTaskLoaded() should return the current "loaded" status', () => {
      const result = TaskSelectors.selectTaskLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTaskError() should return the current "error" state', () => {
      const result = TaskSelectors.selectTaskError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
