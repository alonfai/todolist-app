import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { getPendingTasks, getCompletedTasks } from 'mocks';
import { Interfaces } from 'shared';
import { TaskProvider } from 'context';
import Task from './Task';

describe('components/List', () => {
  let renderResult: RenderResult;
  const initialTasks = new Map<string, Interfaces.Task>([
    ...getCompletedTasks(),
    ...getPendingTasks()
  ]);
  const pendingTask = Array.from(initialTasks.values()).find(
    t => t.status === 'Pending'
  ) as Interfaces.Task;

  it('render successfully', () => {
    renderResult = render(
      <TaskProvider tasks={initialTasks}>
        <table>
          <tbody>
            <Task {...pendingTask} />
          </tbody>
        </table>
      </TaskProvider>
    );
    const elem = renderResult.getByText('Change Priority');
    expect(elem).toBeInTheDocument();
  });

  it('click the delete button', () => {
    renderResult = render(
      <TaskProvider tasks={initialTasks}>
        <table>
          <tbody>
            <Task {...pendingTask} />
          </tbody>
        </table>
      </TaskProvider>
    );
    const btnElem = renderResult.getByText('Delete');
    expect(btnElem).toBeInTheDocument();
    fireEvent.click(btnElem);
  });

  it('received an empty priority for the task => render as an empty string', () => {
    const task: Interfaces.Task = {
      ...pendingTask,
      priority: undefined
    };
    renderResult = render(
      <TaskProvider tasks={initialTasks}>
        <table>
          <tbody>
            <Task {...task} />
          </tbody>
        </table>
      </TaskProvider>
    );
    const priorityCell = renderResult.getByTestId('priority');
    expect(priorityCell).toBeInTheDocument();
    expect(priorityCell).not.toHaveValue();
  });

  it('click the complete button', () => {
    renderResult = render(
      <TaskProvider tasks={initialTasks}>
        <table>
          <tbody>
            <Task {...pendingTask} />
          </tbody>
        </table>
      </TaskProvider>
    );
    const btnElem = renderResult.getByText('Complete');
    expect(btnElem).toBeInTheDocument();
    fireEvent.click(btnElem);
  });

  it('hide the edit button on if task was "Complete" status', () => {
    const completeTask = Array.from(initialTasks.values()).find(
      t => t.status === 'Completed'
    ) as Interfaces.Task;
    renderResult = render(
      <TaskProvider tasks={initialTasks}>
        <table>
          <tbody>
            <Task {...completeTask} />
          </tbody>
        </table>
      </TaskProvider>
    );
    const elem = renderResult.queryByText('Change Priority');
    expect(elem).toBeNull();
  });
});
