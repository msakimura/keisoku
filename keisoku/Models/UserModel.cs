using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class UserModel
    {
        public int CustomerId { get; set; }

        public int UserId { get; set; }

        public string LoginId { get; set; }
        
        public string Password { get; set; }
        
        public string UserName { get; set; }
        
        public string Email { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public CustomerModel Customer { get; set; }

        public ICollection<KengenFuyoModel> KengenFuyos { get; set; }
    }
}
