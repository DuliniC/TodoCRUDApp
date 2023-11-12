using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using todo_crud.backend.Common.DTO;

namespace todo_crud.backend.Business
{
    public static class TodoTaskValidation
    {
        public static void ValidateTodoAdd(TodoTaskAddDTO todoTaskAddDTO)
        {
            if(todoTaskAddDTO == null)
            {
                throw new Exception("Request can not be null");
            }
            else 
            {
                ValidateTitle(todoTaskAddDTO.Title);
            }
        }

        public static void ValidateTodoUpdate(TodoTaskUpdateDTO todoTaskUpdateDTO)
        {
            if (todoTaskUpdateDTO == null)
            {
                throw new Exception("Request can not be null");
            }
            else
            {
                ValidateTitle(todoTaskUpdateDTO.Title);
            }
        }

        private static void ValidateTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                throw new Exception("Request can't be null or contain only spaces");
            }
        }
    }
}
