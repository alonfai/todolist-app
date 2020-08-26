import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import shortid from 'shortid';
import * as Interfaces from './interfaces';
import { Task } from 'shared/interfaces';
import { getPendingTasks, getCompletedTasks } from 'mocks';
import { reducer, TaskProvider, useTaskContext } from './context';
import { errors } from 'shared';

describe('context', () => {
  let initialState: Interfaces.ContextState;
  let initialTasks: Map<string, Task>;

  beforeEach(() => {
    initialTasks = new Map<string, Task>([...getCompletedTasks(), ...getPendingTasks()]);
    initialState = {
      tasks: initialTasks
    };
  });

  describe('reducer function', () => {
    describe('action of type "ADD"', () => {
      it('success', () => {
        const id = shortid.generate();
        const action: Interfaces.AddTaskAction = {
          type: 'ADD',
          payload: {
            id,
            name: `New Task ${id}`,
            priority: undefined
          }
        };
        const newState = reducer(initialState, action);
        expect(newState.tasks).toBeDefined();
        const newTasks = Array.from(newState.tasks.values());
        expect(newTasks.length).toBeGreaterThan(Array.from(initialTasks.values()).length);
        expect(newTasks.find(t => t.id === id)).toBeDefined();
      });
      it('invalid task name exists already as pending', () => {
        const id = shortid.generate();
        const existingTask = Array.from(initialTasks.values()).filter(
          t => t.status === 'Pending'
        )[0];
        const action: Interfaces.AddTaskAction = {
          type: 'ADD',
          payload: {
            id,
            name: existingTask.name,
            priority: undefined
          }
        };
        const newState = reducer(initialState, action);
        expect(Array.from(newState.tasks.values())).toEqual(
          Array.from(initialState.tasks.values())
        );
      });
    });

    describe('action of type "COMPLETE"', () => {
      it('success', () => {
        const task = Array.from(initialTasks.values()).find(t => t.status === 'Pending');
        expect(task).toBeDefined();
        if (task) {
          expect(task.status).toEqual('Pending');
          const action: Interfaces.CompleteTaskAction = {
            type: 'COMPLETE',
            payload: {
              id: task.id
            }
          };
          const newState = reducer(initialState, action);
          expect(newState.tasks).toBeDefined();
          const newTasks = Array.from(newState.tasks.values());
          const updatedTask = newTasks.find(newTask => newTask.id === task.id);
          expect(updatedTask).toBeDefined();
          expect(updatedTask?.status).toEqual('Completed');
        }
      });
      it('invalid task id', () => {
        const invalidId = shortid.generate();
        const task = Array.from(initialTasks.values()).find(t => t.status === 'Pending');
        expect(task).toBeDefined();
        if (task) {
          expect(task.status).toEqual('Pending');
          const action: Interfaces.CompleteTaskAction = {
            type: 'COMPLETE',
            payload: {
              id: invalidId
            }
          };
          try {
            reducer(initialState, action);
          } catch (e: unknown) {
            expect(e).toBeInstanceOf(errors.UserError);
            expect((e as errors.UserError).message).toEqual(
              `Invalid task id ${invalidId} was sent to Complete task action`
            );
          }
        }
      });
    });

    describe('action of type "DELETE"', () => {
      it('success', () => {
        const task = Array.from(initialTasks.values())[2];
        const action: Interfaces.DeleteTaskAction = {
          type: 'DELETE',
          payload: {
            id: task.id
          }
        };
        const newState = reducer(initialState, action);
        expect(newState.tasks).toBeDefined();
        const newTasks = Array.from(newState.tasks.values());
        expect(newTasks.length).toBeLessThanOrEqual(Array.from(initialTasks.entries()).length);
        expect(Array.from(newState.tasks.keys()).includes(task.id)).toEqual(false);
      });
      it('invalid task id', () => {
        const invalidId = shortid.generate();
        const action: Interfaces.DeleteTaskAction = {
          type: 'DELETE',
          payload: {
            id: invalidId
          }
        };
        try {
          reducer(initialState, action);
        } catch (e: unknown) {
          expect(e).toBeInstanceOf(errors.UserError);
          expect((e as errors.UserError).message).toEqual(
            `Invalid task id ${invalidId} was sent to Delete task action`
          );
        }
      });
    });

    describe('action of type "SET_PRIORITY"', () => {
      it('sucess', () => {
        const tasks = Array.from(initialTasks.values());
        const task = tasks[2];
        const newPriority = Math.floor(Math.random() * tasks.length) + 1;
        const action: Interfaces.SetPriorityAction = {
          type: 'SET_PRIORITY',
          payload: {
            id: task.id,
            priority: newPriority
          }
        };
        const newState = reducer(initialState, action);
        expect(newState.tasks).toBeDefined();
        const newTasks = Array.from(newState.tasks.values());
        const newTask = newTasks.find(t => t.id === task.id);
        expect(newTask).toBeDefined();
        expect(newTask?.priority).toEqual(newPriority);
      });

      it('invalid task id', () => {
        const invalidId = shortid.generate();
        const action: Interfaces.SetPriorityAction = {
          type: 'SET_PRIORITY',
          payload: {
            id: invalidId,
            priority: 11
          }
        };
        try {
          reducer(initialState, action);
        } catch (e: unknown) {
          expect(e).toBeInstanceOf(errors.UserError);
          expect((e as errors.UserError).message).toEqual(
            `Invalid task id ${action.payload.id} was sent to Set Priority task action`
          );
        }
      });
    });
  });

  describe('useTaskContext', () => {
    it('empty result', () => {
      try {
        const wrapper = ({ children }) => <div>{children}</div>;
        const { result } = renderHook(() => useTaskContext(), { wrapper });
        expect(result.current).toBeDefined();
        expect(result.current).toEqual({});
      } catch (e: unknown) {
        expect(e).toBeDefined();
      }
    });
    it('existing provider', () => {
      const wrapper = ({ children }) => (
        <TaskProvider tasks={initialTasks}>{children}</TaskProvider>
      );
      const { result } = renderHook(() => useTaskContext(), { wrapper });
      expect(Array.from(result.current.tasks.values())).toEqual(Array.from(initialTasks.values()));
    });
  });
});
