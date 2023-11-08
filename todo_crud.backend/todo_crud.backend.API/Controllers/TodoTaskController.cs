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

        // GET: api/<TodoTaskController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTaskResponseDTO>>> GetAllTodos()
        {
            IEnumerable<TodoTaskResponseDTO> todoResponses = new List<TodoTaskResponseDTO>();
            todoResponses = await this._todoTaskBusinessLogic.GetAllTodos();

            if(!todoResponses.Any()) 
            {
                return NoContent();
            }
            return Ok(todoResponses);
        }

        // GET api/<TodoTaskController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTaskResponseDTO>> GetTodoById(long id)
        {
            var todoResponse = new TodoTaskResponseDTO();
            todoResponse = await this._todoTaskBusinessLogic.GetTodoById(id);
            if(todoResponse == null)
            {
                return NotFound();
            }
            return Ok(todoResponse);
        }

        // POST api/<TodoTaskController>
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

        // PUT api/<TodoTaskController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTodo(int id, [FromBody] string value)
        {
            return Ok();
        }

        // DELETE api/<TodoTaskController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo(int id)
        {
            return Ok();
        }
    }
}
