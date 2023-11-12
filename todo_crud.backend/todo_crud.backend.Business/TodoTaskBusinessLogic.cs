using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using todo_crud.backend.Common.DTO;
using todo_crud.backend.DataAccess;
using todo_crud.backend.DataAccess.Entity;
using todo_crud.backend.DataAccess.UnitOfWork;

namespace todo_crud.backend.Business
{
    public class TodoTaskBusinessLogic : ITodoTaskBusinessLogic
    {
        private readonly IUnitOfWork unitOfWork;

        public TodoTaskBusinessLogic( IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<long> AddTodoTask(TodoTaskAddDTO todoTaskAdd)
        {
            TodoTaskValidation.ValidateTodoAdd(todoTaskAdd);
            var newTodo = new TodoTask
            {
                Title = todoTaskAdd.Title,
                Description = todoTaskAdd.Description,
            };
            await this.unitOfWork.TodoTaskRepository.Add(newTodo);
            this.unitOfWork.Save();  
            return newTodo.Id;
        }

        public async Task<bool> DeleteTodoById(long id)
        {
            var todo = await this.unitOfWork.TodoTaskRepository.GetById(id);

            if(todo != null)
            {
                this.unitOfWork.TodoTaskRepository.Delete(todo);
                this.unitOfWork.Save();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<TodoTaskResponseDTO>> GetAllTodos()
        {
            IList<TodoTaskResponseDTO> todoList = new List<TodoTaskResponseDTO>();
            var todos = await this.unitOfWork.TodoTaskRepository.GetAll();
            foreach (var todo in todos)
            {
                var todoTask = new TodoTaskResponseDTO
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    Priority = todo.Priority,
                    IsCompleted = todo.IsCompleted
                };
                todoList.Add(todoTask);
            }
            return todoList;
        }

        public async Task<TodoTaskResponseDTO?> GetTodoById(long id)
        {
            var todo = await this.unitOfWork.TodoTaskRepository.GetById(id);
            if(todo != null)
            {
                var todoResponse = new TodoTaskResponseDTO
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    Priority = todo.Priority,
                    IsCompleted = todo.IsCompleted
                };
                return todoResponse;
            }

            return null;
        }

        public async Task<bool> UpdateTodoById(TodoTaskUpdateDTO todoTaskUpdate)
        {
            TodoTaskValidation.ValidateTodoUpdate(todoTaskUpdate);
            var todo = await this.unitOfWork.TodoTaskRepository.GetById(todoTaskUpdate.Id);

            if(todo != null)
            {
                todo.Title = todoTaskUpdate.Title;
                todo.Description = todoTaskUpdate.Description;
                todo.Priority = todoTaskUpdate.Priority;
                todo.IsCompleted = todoTaskUpdate.IsCompleted;

                this.unitOfWork.TodoTaskRepository.Update(todo);
                this.unitOfWork.Save();
                return true;
            }
            return false;
        }
    }
}
