using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using todo_crud.backend.DataAccess.Repository;

namespace todo_crud.backend.DataAccess.UnitOfWork
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly TodoDbContext _dbContext;
        public ITodoTaskRepository TodoTaskRepository { get; }

        public UnitOfWork(TodoDbContext _dbContext, ITodoTaskRepository _todoTaskRepository) 
        {
            this._dbContext = _dbContext;
            TodoTaskRepository = _todoTaskRepository;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
        }

        public int Save()
        {
            return _dbContext.SaveChanges();
        }
    }
}
