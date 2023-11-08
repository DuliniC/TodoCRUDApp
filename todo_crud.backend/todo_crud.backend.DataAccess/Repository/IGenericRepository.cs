using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace todo_crud.backend.DataAccess.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetById(long id);
        Task<IEnumerable<T>> GetAll();
        Task Add(T entity);
        void Delete(T entity);
        void Update(T entity);

    }
}
