import React from 'react';
import { Button } from 'react-bootstrap';
import { useTaskContext } from 'context';
import { Interfaces } from 'shared';
import Edit from '../Edit';

import styles from './Task.module.scss';

export type ComponentProps = Interfaces.Task;

const Task: React.FC<ComponentProps> = props => {
  const context = useTaskContext();

  /**
   * event handler when the user clicks on the "Delete" task button
   * @param e event object
   */
  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.dispatch({
      type: 'DELETE',
      payload: {
        id: props.id
      }
    });
  };

  /**
   * event handler when the user clicks on the "Complete" task button
   * @param e event object
   */
  const onComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.dispatch({
      type: 'COMPLETE',
      payload: {
        id: props.id
      }
    });
  };

  return (
    <tr>
      <td className={styles.cell}>{props.id}</td>
      <td className={styles.cell}>{props.name}</td>
      <td data-testid='priority' className={styles.cell}>
        {props.priority ?? ''}
      </td>
      <td className={styles.spacer}>
        <Button variant={'danger'} onClick={onDelete}>
          Delete
        </Button>
        {props.status === 'Pending' && (
          <Button variant={'info'} onClick={onComplete}>
            Complete
          </Button>
        )}
        {props.status === 'Pending' && <Edit {...props} />}
      </td>
    </tr>
  );
};

export default Task;
