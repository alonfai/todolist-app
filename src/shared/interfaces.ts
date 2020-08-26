/**
 * A given task repesentation metadata object
 */
export type Task = {
  /**
   * Unique identifier for the task
   */
  id: string;
  /**
   * Name of the task
   */
  name: string;
  /**
   * Priority for the given task
   */
  priority?: number;
  /**
   * Status of a task
   */
  status: 'Pending' | 'Completed';
};
