using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace todo_crud.backend.DataAccess.Repository
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly TodoDbContext _dbContext;
        protected GenericRepository(TodoDbContext context)
        {
            _dbContext = context;
        }

        public async Task<T> GetById(long id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task Add(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            _dbContext.Set<T>().Update(entity);
        }
    }
}
