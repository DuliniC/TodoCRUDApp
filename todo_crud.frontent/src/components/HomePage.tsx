import { Tab, Row, Nav, Col, Modal, Form } from "react-bootstrap";
import TodoCard from "./TodoCard";
import { useEffect, useState } from "react";
import { TodoTask } from "../models/TodoTaskModel";
import API_BASE_URL from "../config";
import Button from "react-bootstrap/esm/Button";

const HomePage = () => {
  const [todoList, setTodoList] = useState<TodoTask[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleShow = () => setShowAddForm(true);
  const handleClose = () => setShowAddForm(false);
  const validateTitle = () => {
    if(title.trim() == ''){
      alert("Title can not be contain only spaces");
      return;
    }
  }
  const pendingTodoList = todoList.filter((todo) => !todo.isCompleted);
  const completedTodoList = todoList.filter((todo) => todo.isCompleted);

  const addNewTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    validateTitle();
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create Todo");
      }
      
      console.log("Todo created Successfully");
      window.location.reload();
      handleClose();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //GetAll API call
    const getAllTodos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-all`, {
          method: "GET",
          headers: {
            "Content-Type": "text/plain",
          },
        });
        if (response.ok) {
          const todoData: TodoTask[] = await response.json();
          setTodoList(todoData);
        } else {
          console.error("Failed to get todo list");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getAllTodos();
  }, []);

  return (
    <>
      <Tab.Container id="todo-left-tabs" defaultActiveKey="pending-list">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="pending-list">My Todos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="completed-list">Completed Todos</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="pending-list">
                <Button
                  variant="primary"
                  style={{ marginBottom: "10px" }}
                  onClick={(e) => handleShow()}
                >
                  Add New Task
                </Button>
                <TodoCard todo={pendingTodoList} />
              </Tab.Pane>
              <Tab.Pane eventKey="completed-list">
                <TodoCard todo={completedTodoList} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      {/* Todo Add Modal */}
      <Modal show={showAddForm} onHide={handleClose}>
        <Modal.Body>
          <Modal.Title>New Task</Modal.Title>
          <Form onSubmit={addNewTodo}>
            <Form.Group className="mb-3" controlId="todoSubmit">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>{" "}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>     
    </>
  );
};

export default HomePage;
