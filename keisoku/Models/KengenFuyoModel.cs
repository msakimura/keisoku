using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class KengenFuyoModel
    {
        public int CustomerId { get; set; }

        public int UserId { get; set; }

        public int KengenId {get; set;}

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public UserModel User { get; set; }

        public KengenModel Kengen { get; set; }
    }
}
