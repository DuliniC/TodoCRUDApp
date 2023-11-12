import { TodoTask } from "../models/TodoTaskModel";
import { Priorities } from "../models/TodoPriorityEnum";
import * as Icon from "react-bootstrap-icons";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import CheckBox from "./Checkbox";
import API_BASE_URL from "../config";
import { useState } from "react";

type TodoProps = {
  todo: TodoTask[];
};

const TodoCard = ({ todo }: TodoProps) => {
  const colors = [
    {
      //Default
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      //Low Priority
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      //Medium Priority
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      //High Priority
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
  ];
  const compare = () => {
    return;
  };
  const [show, setShowUpdateForm] = useState(false);
  const [updateTodoModel, setUpdateTodoModel] = useState<TodoTask>({
    id: 0,
    title: "",
    description: "",
    priority: Priorities.Default,
    isCompleted: false,
  });

  const handleShow = (todoValue: TodoTask) => {
    setShowUpdateForm(true);
    setUpdateTodoModel({
      id: todoValue.id,
      title: todoValue.title,
      description: todoValue.description,
      isCompleted: todoValue.isCompleted,
      priority: todoValue.priority,
    });
  };
  const handleClose = () => setShowUpdateForm(false);

  const handleOptionChange = (option: Priorities) => {
    setUpdateTodoModel((prevState) => ({ ...prevState, priority: option }));
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/todo-tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updateTodoModel.id,
          title: updateTodoModel.title,
          description: updateTodoModel.description,
          priority: updateTodoModel.priority,
          isCompleted: updateTodoModel.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Update API failed");
      }
      console.log("Todo Updated Successfully");
    } catch (error) {
      console.error("Error updating Todo:", error);
    }
    handleClose();
    window.location.reload();
  };

  const deleteTask = async (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        var response = await fetch(`${API_BASE_URL}/api/todo-tasks/${id}`, {
          method: "DELETE",
        });
        var message = await response.json();
        if (!response.ok) {
          throw new Error(message);
        }

        console.log(message);
      } catch (error) {
        console.log(error);
      }

      window.location.reload();
    }
  };

  return (
    <>
      <Row xs={1} md={2} className="g-3">
        {todo &&
          todo
            .sort((a, b) => {
              const descriptionA = a?.description || "";
              const descriptionB = b?.description || "";
              return descriptionA.length - descriptionB.length;
            })
            .map((todo, index) => (
              <Col key={index} xs={10} sm={6} md={4}>
                <Card
                  style={{
                    width: "100%",
                    borderColor: colors[todo.priority].primaryColor,
                  }}
                >
                  <Card.Header
                    style={{
                      borderColor: colors[todo.priority].primaryColor,
                    }}
                  >
                    <Row>
                      <Col>
                        <div
                          style={{
                            border: `2px solid ${
                              colors[todo.priority].primaryColor
                            }`,
                            backgroundColor:
                              colors[todo.priority].secondaryColor,
                            textAlign: "center",
                            borderRadius: "8px",
                          }}
                        >
                          {Priorities[todo.priority]}
                        </div>
                      </Col>
                      <Col>
                        {todo.title}
                        <CheckBox todo={todo} />
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{todo.description}</Card.Text>
                    <Row>
                      {!todo.isCompleted && (
                        <Col>
                          <Icon.PencilFill
                            color={colors[todo.priority].primaryColor}
                            onClick={(e) => handleShow(todo)}
                          />
                        </Col>
                      )}
                      <Col>
                        <Icon.TrashFill
                          color={colors[todo.priority].primaryColor}
                          onClick={(e) => deleteTask(todo.id)}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                {/* Todo Add Modal */}
                <Modal show={show} onHide={handleClose}>
                  <Modal.Body>
                    <Modal.Title>Update Task</Modal.Title>
                    <Form onSubmit={updateTask}>
                      <Form.Group className="mb-3" controlId="todoSubmit">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={updateTodoModel.title}
                          onChange={(e) =>
                            setUpdateTodoModel((prevState) => ({
                              ...prevState,
                              title: e.target.value,
                            }))
                          }
                          required
                        />
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="description"
                          value={updateTodoModel.description}
                          onChange={(e) =>
                            setUpdateTodoModel((prevState) => ({
                              ...prevState,
                              description: e.target.value,
                            }))
                          }
                        />
                        <Form.Label>Priority</Form.Label>
                        {Object.keys(Priorities)
                          .filter((key) => isNaN(Number(key)))
                          .map((option) => (
                            <Form.Check
                              key={option}
                              type="radio"
                              label={option}
                              name="formRadios"
                              id={`formRadio${option}`}
                              value={
                                Priorities[option as keyof typeof Priorities]
                              }
                              checked={
                                updateTodoModel.priority ===
                                Priorities[option as keyof typeof Priorities]
                              }
                              onChange={(e) =>
                                handleOptionChange(
                                  Priorities[option as keyof typeof Priorities]
                                )
                              }
                            />
                          ))}
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
              </Col>
            ))}
      </Row>
    </>
  );
};

export default TodoCard;
