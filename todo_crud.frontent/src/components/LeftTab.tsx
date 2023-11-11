import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import PendingTodoView from './PendingTodoView';

const LeftTabsExample : React.FC = () => {
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
            <Tab.Pane eventKey="pending-list"><PendingTodoView/></Tab.Pane>
            <Tab.Pane eventKey="completed-list">Second tab content</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default LeftTabsExample;