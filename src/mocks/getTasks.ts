import { Interfaces } from 'shared';
import shortid from 'shortid';

export function getPendingTasks(): Map<string, Interfaces.Task> {
  const tasks: Map<string, Interfaces.Task> = new Map();
  const first = shortid.generate();
  const second = shortid.generate();
  const third = shortid.generate();
  const fourth = shortid.generate();
  tasks.set(first, {
    id: first,
    name: 'Task 1_Pending',
    status: 'Pending',
    priority: 1
  });
  tasks.set(second, {
    id: second,
    name: 'Task 2_Pending',
    status: 'Pending',
    priority: 2
  });
  tasks.set(third, {
    id: third,
    name: 'Task 3_Pending',
    status: 'Pending',
    priority: 3
  });
  tasks.set(fourth, {
    id: fourth,
    name: 'Task 4_Pending',
    status: 'Pending',
    priority: 4
  });

  return tasks;
}

export function getCompletedTasks(): Map<string, Interfaces.Task> {
  const tasks: Map<string, Interfaces.Task> = new Map();
  const first = shortid.generate();
  const second = shortid.generate();
  const third = shortid.generate();
  const fourth = shortid.generate();
  tasks.set(first, {
    id: first,
    name: 'Task 1_Complete',
    status: 'Completed',
    priority: 1
  });
  tasks.set(second, {
    id: second,
    name: 'Task 2_Complete',
    status: 'Completed',
    priority: 2
  });
  tasks.set(third, {
    id: third,
    name: 'Task 3_Complete',
    status: 'Completed',
    priority: 3
  });
  tasks.set(fourth, {
    id: fourth,
    name: 'Task 4_Complete',
    status: 'Completed',
    priority: 4
  });

  return tasks;
}

export function getTaskKeysArray(): string[] {
  return Array.from(new Map([...getCompletedTasks(), ...getPendingTasks()]).keys());
}

export function getTasksArray(): Interfaces.Task[] {
  return Array.from(
    new Map<string, Interfaces.Task>([...getCompletedTasks(), ...getPendingTasks()]).values()
  );
}
