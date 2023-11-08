using Microsoft.EntityFrameworkCore;
using todo_crud.backend.DataAccess.Entity;

namespace todo_crud.backend.DataAccess
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
            
        }

        public DbSet<TodoTask> Tasks { get; set; }
    }
}
