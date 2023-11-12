using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace todo_crud.backend.Business
{
    public static class TodoTaskValidations
    {
        public static void ValidateTitle(string titile)
        {
            if(string.IsNullOrWhiteSpace(titile)) throw new Exception("Title can't be null or only contains spaces");
        }
    }
}
