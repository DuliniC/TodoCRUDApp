import { useState } from "react";
import { Form } from "react-bootstrap";
import { priorities } from "../models/TodoPriorityEnum";
import { TodoTask } from "../models/TodoTaskModel";
import API_BASE_URL from "../config";

type checkBoxProps = {
    todo: TodoTask
}
const CheckBox = ({todo} : checkBoxProps) => {
  
  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {    
    //Call update API
    try
    {
        const response = await fetch(`${API_BASE_URL}/api/todo-tasks`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: todo.id,
                title: todo.title,
                description: todo.description,
                priority: todo.priority,
                isCompleted: e.target.checked
             })
          });
    
          if (!response.ok) {
            throw new Error('Update API failed');
          }
    }
    catch(error )
    {
        console.error('Error updating checkbox:', error);
    }
    window.location.reload();
  }; 
  return (
    <Form>
      <div key="reverse-checkbox" className="mb-3">
        <Form.Check
          reverse
          name="complete-checkbox"
          type="checkbox"
          id="complete-checkbox"
          checked = {todo.isCompleted}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </Form>
  );
};

export default CheckBox;