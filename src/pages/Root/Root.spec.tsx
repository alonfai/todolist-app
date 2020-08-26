import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { getPendingTasks, getCompletedTasks } from 'mocks';
import { TaskProvider } from 'context';
import { Interfaces } from 'shared';
import Root from './Root';

describe('pages/Root', () => {
  let renderResult: RenderResult;
  let pendingTasks: Interfaces.Task[];
  let completedTasks: Interfaces.Task[];

  it('render successfully', () => {
    const tasks = new Map<string, Interfaces.Task>([...getPendingTasks(), ...getCompletedTasks()]);

    pendingTasks = Array.from(tasks.values()).filter(task => task.status === 'Pending');
    completedTasks = Array.from(tasks.values()).filter(task => task.status === 'Completed');
    renderResult = render(
      <TaskProvider tasks={tasks}>
        <Root />
      </TaskProvider>
    );
    const pendingTaskElem = renderResult.getByText('List of Pending Tasks');
    expect(pendingTaskElem).toBeInTheDocument();
    expect(pendingTaskElem.nextElementSibling?.textContent).toEqual('sorted by Name');
    expect(pendingTaskElem.nextElementSibling?.nextElementSibling?.textContent).toEqual(
      `Number of records: ${pendingTasks.length}`
    );

    const completedTaskElem = renderResult.getByText('List of Completed Tasks');
    expect(completedTaskElem).toBeInTheDocument();
    expect(completedTaskElem.nextElementSibling?.textContent).toEqual('sorted by Name');
    expect(completedTaskElem.nextElementSibling?.nextElementSibling?.textContent).toEqual(
      `Number of records: ${completedTasks.length}`
    );
  });
});
