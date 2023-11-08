using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using todo_crud.backend.DataAccess.Entity;

namespace todo_crud.backend.DataAccess.Repository
{
    public interface ITodoTaskRepository: IGenericRepository<TodoTask>
    {
    }
}
