using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static todo_crud.backend.Common.Enums;

namespace todo_crud.backend.Common.DTO
{
    public class TodoTaskUpdateDTO : TodoTaskAddDTO
    {
        public long Id { get; set; }
        public bool IsCompleted { get; set; } = false;
        public Priorities Priority { get; set; } = default;

    }
}
