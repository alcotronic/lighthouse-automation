import { TaskExecutionEntity } from './task-execution.models';
import {
  taskExecutionAdapter,
  TaskExecutionPartialState,
  initialTaskExecutionState,
} from './task-execution.reducer';
import * as TaskExecutionSelectors from './task-execution.selectors';

describe('TaskExecution Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTaskExecutionId = (it: TaskExecutionEntity) => it.id;
  const createTaskExecutionEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TaskExecutionEntity);

  let state: TaskExecutionPartialState;

  beforeEach(() => {
    state = {
      taskExecution: taskExecutionAdapter.setAll(
        [
          createTaskExecutionEntity('PRODUCT-AAA'),
          createTaskExecutionEntity('PRODUCT-BBB'),
          createTaskExecutionEntity('PRODUCT-CCC'),
        ],
        {
          ...initialTaskExecutionState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('TaskExecution Selectors', () => {
    it('selectAllTaskExecution() should return the list of TaskExecution', () => {
      const results = TaskExecutionSelectors.selectAllTaskExecution(state);
      const selId = getTaskExecutionId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TaskExecutionSelectors.selectEntity(
        state
      ) as TaskExecutionEntity;
      const selId = getTaskExecutionId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectTaskExecutionLoaded() should return the current "loaded" status', () => {
      const result = TaskExecutionSelectors.selectTaskExecutionLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTaskExecutionError() should return the current "error" state', () => {
      const result = TaskExecutionSelectors.selectTaskExecutionError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
