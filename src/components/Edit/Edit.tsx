import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTaskContext } from 'context';
import { Interfaces } from 'shared';

export type ComponentProps = Interfaces.Task & {};

const Edit: React.FC<ComponentProps> = props => {
  const context = useTaskContext();
  const [show, setShow] = useState(false);
  const [priority, setPriority] = useState(props.priority ? props.priority.toString() : '');

  /**
   * event handler to hide the modal window
   */
  const handleClose = () => {
    setPriority(props.priority ? props.priority.toString() : '');
    setShow(false);
  };

  /**
   * event handler to show the modal window
   */
  const handleShow = () => setShow(true);

  /**
   * event handler when the priority input field gets changed
   * @param e event object
   */
  const onPriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(e.currentTarget.value);
  };

  /**
   * event handler when user confirms the change
   * @param e event object
   */
  const onConfirm = () => {
    context.dispatch({
      type: 'SET_PRIORITY',
      payload: {
        id: props.id,
        priority: parseInt(priority, 10)
      }
    });
    handleClose();
  };

  return (
    <>
      <Button variant={'secondary'} onClick={handleShow}>
        Change Priority
      </Button>
      <Modal show={show} onHide={handleClose} data-testid='modalWindow'>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Change "{props.name}" priority</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId='taskPriority'>
              <Form.Label>Priority</Form.Label>
              <Form.Control
                type='number'
                placeholder='Priority'
                value={priority}
                onChange={onPriorityChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='primary' disabled={!priority} onClick={onConfirm}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default React.memo(Edit);
