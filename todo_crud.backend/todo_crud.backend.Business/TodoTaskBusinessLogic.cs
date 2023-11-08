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

        public async Task AddTodoTask(TodoTaskAddDTO todoTaskAdd)
        {

            var newTodo = new TodoTask
            {
                Title = todoTaskAdd.Title,
                Description = todoTaskAdd.Description,
            };
            await unitOfWork.TodoTaskRepository.Add(newTodo);
            unitOfWork.Save();           
        }

        public Task DeleteTodoById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TodoTaskResponseDTO>> GetAllTodos()
        {
            var todoList = new List<TodoTaskResponseDTO>();
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

        public async Task<TodoTaskResponseDTO> GetTodoById(long id)
        {
            TodoTaskResponseDTO todoResponse = null;
            var todo = await this.unitOfWork.TodoTaskRepository.GetById(id);
            if(todo != null)
            {
                todoResponse.Id = todo.Id;
                todoResponse.Title = todo.Title;
                todoResponse.Description = todo.Description;
                todoResponse.Priority = todo.Priority;
                todoResponse.IsCompleted = todo.IsCompleted;

            }

            return todoResponse;
        }

        public Task<bool> UpdateTodoById(TodoTaskUpdateDTO todoTaskUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
