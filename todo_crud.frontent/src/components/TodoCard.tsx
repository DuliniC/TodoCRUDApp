import Card from 'react-bootstrap/Card';
import { TodoTask } from '../models/TodoTaskModel';
import { priorities } from '../models/TodoPriorityEnum';

type TodoProps = {
    todo : TodoTask[]
}

const TodoCard = ({todo}: TodoProps) => {
    
    const colors = [
        {
            //Default
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            //Low Priority
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            //Medium Priority
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },        
        {
            //High Priority
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        }
    ];

    return(
        <>
            {todo && todo.map((todo) => (
                <Card style={{ width: '18rem' }} border={colors[todo.priority].primaryColor}>
                    <Card.Body>
                        <Card.Title>{todo.title}</Card.Title>                   
                        <Card.Text>
                        {todo.description}
                        </Card.Text>
                        <div style={{"position":"absolute",}}>
                        <div style={{"color": colors[todo.priority].secondaryColor}}>{todo.priority as priorities}</div>
                        <i className = "bi bi-pencil" style={{"color" : colors[todo.priority].primaryColor, "cursor" : "pointer"}} ></i>
                        <i className="fas fa-trash-alt" style = {{"color" : colors[todo.priority].primaryColor, "cursor" : "pointer"}} ></i>
                        </div>
                    </Card.Body>
               </Card>
            ))}
        </>       
    );
}

export default TodoCard;