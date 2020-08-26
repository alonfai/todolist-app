import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider } from 'context';
import { Interfaces } from 'shared';
import { getPendingTasks } from 'mocks';
import Edit from './Edit';

describe('components/Edit', () => {
  let renderResult: RenderResult;
  const initialProviderTasks = getPendingTasks();
  const iniitalTasksArray = Array.from(initialProviderTasks.values());
  let task = iniitalTasksArray[0];

  it('render successfully', async () => {
    renderResult = render(
      <TaskProvider tasks={initialProviderTasks}>
        <Edit {...task} />
      </TaskProvider>
    );
    const btnElem = renderResult.getByText('Change Priority');
    expect(btnElem).toBeInTheDocument();
    await userEvent.click(btnElem);
    const modalElem = renderResult.getByTestId('modalWindow');
    expect(modalElem).toBeInTheDocument();
  });

  it('reset the task priority to empty string if given input has priority with undefined in it', () => {});

  it('check the dispatch functionality', async () => {
    const newPriority = 100;
    renderResult = render(
      <TaskProvider tasks={initialProviderTasks}>
        <Edit {...task} priority={newPriority} />
      </TaskProvider>
    );
    const btnElem = renderResult.getByText('Change Priority');
    expect(btnElem).toBeInTheDocument();
    await userEvent.click(btnElem);

    const priorityElem = renderResult.getByPlaceholderText('Priority');
    expect(priorityElem).toBeInTheDocument();
    expect(priorityElem).toHaveValue(newPriority);

    const confirmBtn = renderResult.getByText('Save');
    expect(confirmBtn).toBeInTheDocument();

    const modal = renderResult.getByRole('dialog');
    expect(modal).toHaveClass('show');
    await userEvent.click(confirmBtn);
    expect(modal).not.toHaveClass('show');
  });

  it('non existing priority => initialize it to be empty', async () => {
    const originalTask: Interfaces.Task = {
      ...task,
      priority: undefined
    };
    renderResult = render(
      <TaskProvider tasks={initialProviderTasks}>
        <Edit {...originalTask} />
      </TaskProvider>
    );
    const btnElem = renderResult.getByText('Change Priority');
    expect(btnElem).toBeInTheDocument();
    await userEvent.click(btnElem);

    const priorityInput = renderResult.getByPlaceholderText('Priority');
    expect(priorityInput).toBeInTheDocument();
    expect(priorityInput).not.toHaveValue();
  });

  describe('check the handleClose event', () => {
    it('has a given priority', async () => {
      renderResult = render(
        <TaskProvider tasks={initialProviderTasks}>
          <Edit {...task} />
        </TaskProvider>
      );
      const btnElem = renderResult.getByText('Change Priority');
      expect(btnElem).toBeInTheDocument();
      await userEvent.click(btnElem);

      const closeBtn = renderResult.getByText('Cancel');
      expect(closeBtn).toBeInTheDocument();

      const modal = renderResult.getByRole('dialog');
      expect(modal).toHaveClass('show');
      await userEvent.click(closeBtn);
      expect(modal).not.toHaveClass('show');
    });
    it('empty priority and close the dialog => reset it to an empty string', async () => {
      const originalTask: Interfaces.Task = {
        ...task,
        priority: undefined
      };
      renderResult = render(
        <TaskProvider tasks={initialProviderTasks}>
          <Edit {...originalTask} />
        </TaskProvider>
      );
      const btnElem = renderResult.getByText('Change Priority');
      expect(btnElem).toBeInTheDocument();
      await userEvent.click(btnElem);

      const priorityInput = renderResult.getByPlaceholderText('Priority');
      expect(priorityInput).toBeInTheDocument();
      expect(priorityInput).not.toHaveValue();

      await userEvent.clear(priorityInput);
      expect(priorityInput).not.toHaveValue();
      await userEvent.type(priorityInput, '1000');
      expect(priorityInput).toHaveValue(1000);

      const closeBtn = renderResult.getByText('Cancel');
      expect(closeBtn).toBeInTheDocument();

      await userEvent.click(closeBtn);

      expect(priorityInput).not.toHaveValue();
    });
  });

  it('check that onPriorityChange gets called properly', async () => {
    const originalPriority = 10;
    const originalTask: Interfaces.Task = {
      ...task,
      priority: originalPriority
    };
    renderResult = render(
      <TaskProvider tasks={initialProviderTasks}>
        <Edit {...originalTask} />
      </TaskProvider>
    );
    const btnElem = renderResult.getByText('Change Priority');
    expect(btnElem).toBeInTheDocument();
    await userEvent.click(btnElem);

    const modal = renderResult.getByRole('dialog');
    expect(modal).toHaveClass('show');

    const priorityInput = renderResult.getByPlaceholderText('Priority');
    expect(priorityInput).toBeInTheDocument();
    expect(priorityInput).toHaveValue(originalPriority);

    // clear the current priority
    await userEvent.clear(priorityInput);
    expect(priorityInput).not.toHaveValue();

    // type in new priority
    const newPriority = originalPriority + 10;
    await userEvent.type(priorityInput, newPriority.toString());
    expect(priorityInput).toHaveValue(newPriority);
  });
});
