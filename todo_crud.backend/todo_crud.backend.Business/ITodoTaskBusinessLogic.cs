using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using todo_crud.backend.Common.DTO;

namespace todo_crud.backend.Business
{
    public interface ITodoTaskBusinessLogic
    {
        Task<TodoTaskResponseDTO> GetTodoById(long id);
        Task<IEnumerable<TodoTaskResponseDTO>> GetAllTodos();
        Task AddTodoTask(TodoTaskAddDTO todoTaskAdd);
        Task<bool> UpdateTodoById(TodoTaskUpdateDTO todoTaskUpdate);
        Task DeleteTodoById(int id);
    }
}
