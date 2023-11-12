using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using static todo_crud.backend.Common.Enums;

namespace todo_crud.backend.DataAccess.Entity
{
    public class TodoTask
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public Priorities Priority { get; set; } = default;
    }
}
