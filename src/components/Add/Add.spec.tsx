import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider } from 'context';
import Add from './Add';

describe('components/Add', () => {
  let renderResult: RenderResult;

  it('render successfully', () => {
    renderResult = render(<Add />);
    const btnElement = renderResult.getByText('Add task');
    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveAttribute('disabled');
  });

  it('check the name input', async () => {
    renderResult = render(<Add />);
    const nameInput = renderResult.getByPlaceholderText('Enter name');
    expect(nameInput).toBeInTheDocument();
    await userEvent.type(nameInput, 'Hello, World!');
    expect(nameInput).toHaveValue('Hello, World!');
  });

  it('check the priority input', async () => {
    renderResult = render(<Add />);
    const priorityInput = renderResult.getByPlaceholderText('Enter priority');
    expect(priorityInput).toBeInTheDocument();
    await userEvent.type(priorityInput, '1');
    expect(priorityInput).toHaveValue(1);
  });

  it('check isDisabled property on the button', async () => {
    renderResult = render(<Add />);
    const btnElement = renderResult.getByText('Add task');
    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveAttribute('disabled');

    const nameInput = renderResult.getByPlaceholderText('Enter name');
    expect(nameInput).toBeInTheDocument();
    await userEvent.type(nameInput, 'Hello, World!');

    const priorityInput = renderResult.getByPlaceholderText('Enter priority');
    expect(priorityInput).toBeInTheDocument();
    await userEvent.type(priorityInput, '1');

    expect(btnElement).not.toHaveAttribute('disabled');
  });

  it('click the add task button', async () => {
    renderResult = render(
      <TaskProvider>
        <Add />
      </TaskProvider>
    );
    const btnElement = renderResult.getByText('Add task');
    expect(btnElement).toBeInTheDocument();

    const nameInput = renderResult.getByPlaceholderText('Enter name');
    expect(nameInput).toBeInTheDocument();
    await userEvent.type(nameInput, 'Hello, World!');

    const priorityInput = renderResult.getByPlaceholderText('Enter priority');
    expect(priorityInput).toBeInTheDocument();
    await userEvent.type(priorityInput, '1');

    expect(btnElement).not.toHaveAttribute('disabled');
    await userEvent.click(btnElement);

    expect(nameInput).toHaveValue('');
    expect(priorityInput).not.toHaveValue();
  });
});
