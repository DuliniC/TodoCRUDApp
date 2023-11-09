using Microsoft.AspNetCore.Mvc;
using todo_crud.backend.Business;
using todo_crud.backend.Common.DTO;
using todo_crud.backend.DataAccess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace todo_crud.backend.API.Controllers
{
    [Route("api/todo-tasks")]
    [ApiController]
    public class TodoTaskController : ControllerBase
    {
        private readonly ITodoTaskBusinessLogic _todoTaskBusinessLogic;
        public TodoTaskController(ITodoTaskBusinessLogic todoTaskBusinessLogic)
        {
            this._todoTaskBusinessLogic = todoTaskBusinessLogic;
        }

        // GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTaskResponseDTO>>> GetAllTodos()
        {
            IEnumerable<TodoTaskResponseDTO> todoResponses = new List<TodoTaskResponseDTO>();
            try
            {
                todoResponses = await this._todoTaskBusinessLogic.GetAllTodos();

                if (!todoResponses.Any())
                {
                    return NoContent();
                }

            }
            catch
            {
                return BadRequest();
            }
            return Ok(todoResponses);

        }

        // GET By Id
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTaskResponseDTO>> GetTodoById(long id)
        {
            var todoResponse = new TodoTaskResponseDTO();
            try
            {
                todoResponse = await this._todoTaskBusinessLogic.GetTodoById(id);
                if (todoResponse == null)
                {
                    return NotFound($"{id} task not found");
                }
            }
            catch
            {
                return BadRequest();
            }
            return Ok(todoResponse);
        }

        // POST
        [HttpPost]
        public async Task<ActionResult> CreateTodoTask([FromBody] TodoTaskAddDTO todoValues)
        {
            try
            {
                await _todoTaskBusinessLogic.AddTodoTask(todoValues);
            }
            catch
            {
                return BadRequest();
            }

            return Created("\"api/todo-tasks", todoValues);
        }

        // PUT By Id
        [HttpPut]
        public async Task<ActionResult> UpdateTodo([FromBody] TodoTaskUpdateDTO todoUpdateValue)
        {
            try
            {
                var response = await _todoTaskBusinessLogic.UpdateTodoById(todoUpdateValue);
                if (!response)
                {
                    return NotFound($"{todoUpdateValue.Id} task not found");
                }
            }
            catch
            {
                return BadRequest();
            }
            return Ok("Task updated Successfully");
        }

        // DELETE api/<TodoTaskController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo(long id)
        {
            try
            {
                var response = await _todoTaskBusinessLogic.DeleteTodoById(id);
                if (!response)
                {
                    return NotFound($"{id} task not found");
                }
            }
            catch
            {
                return BadRequest();
            }
            return Ok("Task Deleted Successfully");
        }
    }
}
