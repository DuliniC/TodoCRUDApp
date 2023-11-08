using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static todo_crud.backend.Common.Enums;

namespace todo_crud.backend.Common.DTO
{
    public class TodoTaskBaseDTO
    {
        public string Title { get; set; }
        public string? Description { get; set; }

    }
}
