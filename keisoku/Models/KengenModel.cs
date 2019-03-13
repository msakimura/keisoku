using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class KengenModel
    {
        public int KengenId { get; set; }

        public string KengenName { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public ICollection<KengenFuyoModel> KengenFuyos { get; set; }
    }
}
