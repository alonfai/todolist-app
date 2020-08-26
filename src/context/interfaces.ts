import { Interfaces } from 'shared';
/**
 * Add a new task
 */
export type AddTaskAction = {
  type: 'ADD';
  payload: Omit<Interfaces.Task, 'status'>;
};

/**
 * Complete a task action
 */
export type CompleteTaskAction = {
  type: 'COMPLETE';
  payload: {
    /**
     * Task id to complete
     */
    id: string;
  };
};

/**
 * Set priority for a task action
 */
export type SetPriorityAction = {
  type: 'SET_PRIORITY';
  payload: {
    /**
     * task id to set priority on
     */
    id: string;
    /**
     * Priority to set for the task
     */
    priority: number;
  };
};

/**
 * Delete task action
 */
export type DeleteTaskAction = {
  type: 'DELETE';
  payload: {
    /**
     * task id to delete
     */
    id: string;
  };
};

export interface ContextState {
  /**
   * list of tasks associated with the
   */
  tasks: Map<string, Interfaces.Task>;
}
/**
 * React Context API used across the App
 */
export interface TaskProviderContext extends ContextState {
  /**
   * Dispatch an event to modify the tasks collection
   */
  dispatch: React.Dispatch<TaskAction>;
}

/**
 * Actions allowed on the main reducer
 */
export type TaskAction = AddTaskAction | DeleteTaskAction | CompleteTaskAction | SetPriorityAction;
