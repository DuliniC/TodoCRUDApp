using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using todo_crud.backend.DataAccess.Entity;

namespace todo_crud.backend.DataAccess.Repository
{
    public class TodoTaskRepository : GenericRepository<TodoTask>, ITodoTaskRepository
    {
        public TodoTaskRepository(TodoDbContext context) : base(context)
        {
        }
    }
}
