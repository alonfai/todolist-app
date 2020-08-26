import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { getTasksArray } from 'mocks';
import { Interfaces } from 'shared';
import { List, sortFunc } from './List';

describe('components/List', () => {
  let renderResult: RenderResult;
  const title = 'This is a list';
  const tasks = getTasksArray();

  it('render successfully', () => {
    renderResult = render(<List tasks={tasks} title={title} />);
    const tblElem = renderResult.getByTestId('table');
    expect(tblElem).toBeInTheDocument();
    expect(tblElem.firstChild?.nextSibling?.hasChildNodes()).toEqual(true);
  });

  it('render empty list', () => {
    renderResult = render(<List tasks={[]} title={title} />);
    const tblElem = renderResult.getByTestId('table');
    expect(tblElem).toBeInTheDocument();
    expect(tblElem.firstChild?.nextSibling?.hasChildNodes()).toEqual(false);
  });

  it('change sorting click by "Prioirty"', () => {
    renderResult = render(<List tasks={tasks} title={title} />);
    const btnPrioritySort = renderResult.getByText('Task Priority');
    expect(btnPrioritySort).toBeInTheDocument();
    fireEvent.click(btnPrioritySort);
    const tblElem = renderResult.getByTestId('table');
    expect(tblElem).toBeInTheDocument();
  });

  it('change sorting by "Name"', () => {
    renderResult = render(<List tasks={tasks} title={title} />);
    const btnPrioritySort = renderResult.getByText('Task Name');
    expect(btnPrioritySort).toBeInTheDocument();
    fireEvent.click(btnPrioritySort);
    const tblElem = renderResult.getByTestId('table');
    expect(tblElem).toBeInTheDocument();
  });

  describe('sortFunc', () => {
    describe('critirea "Name"', () => {
      it('taskA.name is before taskB.name => return -1', () => {
        const taskA: Interfaces.Task = {
          id: '1',
          name: 'a',
          status: 'Pending',
          priority: 1
        };
        const taskB: Interfaces.Task = {
          id: '2',
          name: 'cb',
          status: 'Pending',
          priority: 1
        };
        expect(sortFunc('Name')(taskA, taskB)).toEqual(-1);
      });

      it('taskA.name is after taskB.name => return 1', () => {
        const taskA: Interfaces.Task = {
          id: '1',
          name: 'machine',
          status: 'Pending',
          priority: 1
        };
        const taskB: Interfaces.Task = {
          id: '2',
          name: 'door',
          status: 'Pending',
          priority: 1
        };
        expect(sortFunc('Name')(taskA, taskB)).toEqual(1);
      });

      it('taskA.name is same as taskB.name => return 1', () => {
        const taskA: Interfaces.Task = {
          id: '1',
          name: 'hello',
          status: 'Pending',
          priority: 1
        };
        const taskB: Interfaces.Task = {
          id: '2',
          name: 'hello',
          status: 'Pending',
          priority: 1
        };
        expect(sortFunc('Name')(taskA, taskB)).toEqual(1);
      });
    });

    describe('critirea "Priority', () => {
      it('taskA.priority not set and taskB.priority not set => return 0', () => {
        const taskA: Interfaces.Task = {
          id: '1',
          name: 'a',
          status: 'Pending'
        };
        const taskB: Interfaces.Task = {
          id: '2',
          name: 'cb',
          status: 'Pending'
        };
        expect(sortFunc('Prioirty')(taskA, taskB)).toEqual(0);
      });

      it('taskA.priority is not set => return -1', () => {
        const taskA: Interfaces.Task = {
          id: '1',
          name: 'a',
          status: 'Pending'
        };
        const taskB: Interfaces.Task = {
          id: '2',
          name: 'cb',
          status: 'Pending',
          priority: 1
        };
        expect(sortFunc('Prioirty')(taskA, taskB)).toEqual(-1);
      });

      it('taskB.priority is not set => return 1', () => {
        const taskA: Interfaces.Task = {
          id: '1',
          name: 'a',
          status: 'Pending',
          priority: 1
        };
        const taskB: Interfaces.Task = {
          id: '2',
          name: 'cb',
          status: 'Pending'
        };
        expect(sortFunc('Prioirty')(taskA, taskB)).toEqual(1);
      });

      it('return the difference between taskA.priority and taskB.priority', () => {
        let taskA: Interfaces.Task = {
          id: '1',
          name: 'a',
          status: 'Pending',
          priority: 5
        };
        let taskB: Interfaces.Task = {
          id: '2',
          name: 'cb',
          status: 'Pending',
          priority: 6
        };
        expect(sortFunc('Prioirty')(taskA, taskB)).toEqual(-1);

        taskA.priority = 6;
        taskB.priority = 5;
        expect(sortFunc('Prioirty')(taskA, taskB)).toEqual(1);
      });
    });
  });
});
