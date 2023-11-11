import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import TodoCard from './TodoCard';
import { useEffect, useState } from 'react';
import { TodoTask } from '../models/TodoTaskModel';
import API_BASE_URL from '../config';
import Button from 'react-bootstrap/esm/Button';

const LeftTabsExample = () => {
  const [todoList, setTodoList] = useState<TodoTask[]>([]);
  const pendingTodoList = todoList.filter((todo) => !todo.isCompleted);
  const completedTodoList = todoList.filter((todo) => todo.isCompleted);

    useEffect(() => {
        //GetAll API call
        const getAllTodos = async () => {
            try {
              const response = await fetch(`${API_BASE_URL }/api/todo-tasks`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'text/plain',
                }
              }); 
              if (response.ok) {
                const todoData: TodoTask[] = await response.json();
                setTodoList(todoData);
              } else {
                console.error('Failed to get todo list');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
       
          getAllTodos();
    }, [])

    
  return (
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
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="pending-list">
              <Button variant="primary" style={{margin: '10px'}}>Add New Task</Button>
              <TodoCard todo={pendingTodoList}/>
            </Tab.Pane>
            <Tab.Pane eventKey="completed-list"><TodoCard todo={completedTodoList}/></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default LeftTabsExample;