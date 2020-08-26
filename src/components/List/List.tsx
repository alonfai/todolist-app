import React, { useState } from 'react';
import { Table, Card, ButtonGroup, Button } from 'react-bootstrap';
import { Task } from 'components';
import { Interfaces } from 'shared';

import styles from './List.module.scss';

export type ComponentProps = {
  /**
   * title for the list rendered
   */
  title: string;
  /**
   * list of tasks to render
   */
  tasks: Interfaces.Task[];
};

export type SortingCritirea = 'Prioirty' | 'Name';

/**
 * Sorting method for tasks
 * @param sortBy critiriea to sort by
 */
export const sortFunc: (
  sortBy: SortingCritirea
) => (taskA: Interfaces.Task, taskB: Interfaces.Task) => number = sortBy => (taskA, taskB) => {
  switch (sortBy) {
    case 'Name':
      return taskA.name.toLowerCase() < taskB.name.toLowerCase() ? -1 : 1;
    case 'Prioirty':
    default:
      if (!taskA.priority && !taskB.priority) {
        return 0;
      } else if (!taskA.priority) {
        return -1;
      } else if (!taskB.priority) {
        return 1;
      }
      return taskA.priority - taskB.priority;
  }
};

export const List: React.FC<ComponentProps> = ({ title, tasks }) => {
  const [sortBy, setSortBy] = useState<SortingCritirea>('Name');

  /**
   * event handler for the sorting critirea
   * @param selection selection
   */
  const onSorting = (selection: SortingCritirea) => () => {
    setSortBy(selection);
  };

  return (
    <Card className={styles.spacer}>
      <Card.Body>
        <h2>{title}</h2>
        <h3>sorted by {sortBy}</h3>
        <h2>Number of records: {tasks.length}</h2>
        <div className={styles.spacer}>
          Click any of the buttons to change your sorting order
          <ButtonGroup aria-label='sorting'>
            <Button className={styles.sortGroup} variant='primary' onClick={onSorting('Name')}>
              Task Name
            </Button>
            <Button
              className={styles.sortGroup}
              variant='secondary'
              onClick={onSorting('Prioirty')}>
              Task Priority
            </Button>
          </ButtonGroup>
        </div>
        <Table data-testid={'table'} striped bordered hover>
          <thead>
            <tr>
              <th className={styles.cell}>task Id</th>
              <th className={styles.cell}>Name</th>
              <th className={styles.cell}>Priority</th>
              <th className={styles.cell}>Actions</th>
            </tr>
          </thead>
          <tbody data-testid={'taskItems'}>
            {tasks.sort(sortFunc(sortBy)).map(task => {
              return <Task key={task.id} {...task} />;
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default React.memo(List);
