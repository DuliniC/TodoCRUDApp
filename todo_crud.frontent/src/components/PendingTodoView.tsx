import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { TodoTask } from "../models/TodoTaskModel";
import { TodoTaskAdd } from "../models/TodoTaskAddModel";
import { title } from "process";


const PendingTodoView = () => {
    const [todoList, setTodoList] = useState<TodoTask[]>([]);
    const completedTodoList = todoList.filter((todo) => !todo.isCompleted);

    useEffect(() => {
        //GetAll API call
        const getAllTodos = async () => {
            try {
              const response = await fetch('api/todo-tasks'); 
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
       
    return(
        <>
            <TodoCard todo={completedTodoList}/>
        </>
    );
}

export default PendingTodoView;