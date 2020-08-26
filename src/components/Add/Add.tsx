import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import shortid from 'shortid';
import { useTaskContext } from 'context';

export type ComponentProps = {};

const Add: React.FC<ComponentProps> = () => {
  const context = useTaskContext();
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('');

  /**
   * Add event -> dispatch an action to update the context
   */
  const onAddTask = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    context.dispatch({
      type: 'ADD',
      payload: {
        id: shortid.generate(),
        name,
        priority: parseInt(priority, 10)
      }
    });
    setName('');
    setPriority('');
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const onPriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(e.currentTarget.value);
  };

  /**
   * Disable the add button if either "name" or "priority" fields have not been entered
   */
  const isAddDisabled = !name || !priority ? true : false;

  return (
    <Form>
      <h2>Add a new task</h2>
      <Form.Group controlId='taskName'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          maxLength={40}
          type='text'
          placeholder='Enter name'
          value={name}
          onChange={onNameChange}
        />
      </Form.Group>
      <Form.Group controlId='taskPriority'>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          type='number'
          placeholder='Enter priority'
          value={priority}
          onChange={onPriorityChange}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={isAddDisabled} onClick={onAddTask}>
        Add task
      </Button>
    </Form>
  );
};

export default Add;
