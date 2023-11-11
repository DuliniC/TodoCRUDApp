import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type TodoAddFormProps = {
  isShow : boolean
};

const TodoAddForm = ({isShow}: TodoAddFormProps) => {
  const [show, setShow] = useState(isShow);

  const handleClose = () => setShow(false);
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Title>Add New Task</Modal.Title>
          <Form>
            <Form.Group className="mb-3" controlId="todoSubmit">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Add
            </Button>{" "}
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TodoAddForm;
