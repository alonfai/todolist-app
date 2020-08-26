import React, { useMemo } from 'react';
import { Add, List } from 'components';
import { useTaskContext } from 'context';

import styles from './Root.module.scss';

export type ComponentProps = {};

const Root: React.FC<ComponentProps> = () => {
  const { tasks } = useTaskContext();

  const completedTasks = useMemo(
    () => Array.from(tasks.values()).filter(task => task.status === 'Completed'),
    [tasks]
  );
  const pendingTasks = useMemo(
    () => Array.from(tasks.values()).filter(task => task.status === 'Pending'),
    [tasks]
  );

  return (
    <div>
      <section className={styles.spacer}>
        <Add />
      </section>
      <section className={styles.spacer}>
        <List title={'List of Pending Tasks'} tasks={pendingTasks} />
        <List title={'List of Completed Tasks'} tasks={completedTasks} />
      </section>
    </div>
  );
};

export default Root;
