import { TodoTask } from "../models/TodoTaskModel";
import { priorities } from "../models/TodoPriorityEnum";
import * as Icon from "react-bootstrap-icons";
import { Card, Col, Row } from "react-bootstrap";
import CheckBox from "./Checkbox";

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

  return (
    <>
      <Row xs={1} md={2} className="g-3" >
        {todo &&
          todo.map((todo, index) => (
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
                    <Col>{todo.title}</Col>               
                  <Col>
                    <div
                      style={{
                        border: `2px solid ${
                          colors[todo.priority].primaryColor
                        }`,
                        backgroundColor: colors[todo.priority].secondaryColor,
                        textAlign: "center",
                        borderRadius: "8px",
                      }}
                    >   
                      {priorities[todo.priority]}
                    </div>
                  </Col>
                  <Col>
                      <CheckBox todo = {todo}/>
                  </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{todo.description}</Card.Text>
                  <Row>
                    <Col>
                      <Icon.PencilFill
                        color={colors[todo.priority].primaryColor}
                      />
                    </Col>
                    <Col>
                      <Icon.TrashFill
                        color={colors[todo.priority].primaryColor}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default TodoCard;
