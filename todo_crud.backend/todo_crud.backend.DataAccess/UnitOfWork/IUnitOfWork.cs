using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using todo_crud.backend.DataAccess.Repository;

namespace todo_crud.backend.DataAccess.UnitOfWork
{
    public interface IUnitOfWork :IDisposable
    {
        ITodoTaskRepository TodoTaskRepository { get; }
        int Save();
    }
}
