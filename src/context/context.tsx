import React, { useContext, useReducer, useMemo, Reducer } from 'react';
import produce from 'immer';
import { errors } from 'shared';
import * as Interfaces from './interfaces';

/**
 * Reducer function to manage status of all given tasks in the app (been persisted as part of the main "Taskcontext" React context API object)
 * @param state State of the Tasks collection
 * @param action action to modify the tasks data
 */
export const reducer: Reducer<Interfaces.ContextState, Interfaces.TaskAction> = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD':
        const task = Array.from(draft.tasks.values())
          .filter(t => t.status === 'Pending')
          .map(t => t.name)
          .includes(action.payload.name);
        // Don't add a task with same name
        if (task) {
          alert(
            `Invalid task name ${action.payload.name} was already existed in the list of tasks`
          );
        } else {
          draft.tasks.set(action.payload.id, {
            ...action.payload,
            status: 'Pending'
          });
        }
        break;
      case 'COMPLETE':
        {
          const task = draft.tasks.get(action.payload.id);
          if (!task) {
            throw new errors.UserError(
              `Invalid task id ${action.payload.id} was sent to Complete task action`
            );
          }
          draft.tasks.set(action.payload.id, {
            ...task,
            status: 'Completed'
          });
        }
        break;
      case 'DELETE':
        {
          const task = draft.tasks.get(action.payload.id);
          if (!task) {
            throw new errors.UserError(
              `Invalid task id ${action.payload.id} was sent to Delete task action`
            );
          }
          draft.tasks.delete(action.payload.id);
        }
        break;
      case 'SET_PRIORITY':
        {
          const task = draft.tasks.get(action.payload.id);
          if (!task) {
            throw new errors.UserError(
              `Invalid task id ${action.payload.id} was sent to Set Priority task action`
            );
          }
          draft.tasks.set(action.payload.id, {
            ...task,
            priority: action.payload.priority
          });
        }
        break;
    }
  });
};

/**
 * Reference to the context of the tasks
 */
const TaskContext = React.createContext({} as Interfaces.TaskProviderContext);

/**
 * Get the Task context provider with the different state data used across the entire sideNav
 */
export const TaskProvider: React.FC<Partial<Interfaces.ContextState>> = ({
  tasks = new Map(),
  children
}) => {
  const [state, dispatch] = useReducer(reducer, { tasks });

  // Use useMemo for optimization reasons. This says don't give back a new state unless main props.tasks has changed
  const value = useMemo(
    () => ({
      tasks: state.tasks,
      dispatch
    }),
    [state]
  );
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

/**
 * Retrieve the tasks context data
 */
export function useTaskContext(): Interfaces.TaskProviderContext {
  const context = useContext(TaskContext);
  if (!context) {
    throw new errors.UserError('TaskContext must be used with TaskProvider!');
  }
  return context;
}
