using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AiRiyouJoukyouModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public string Riyoubi { get; set; }

        public int TunnelNumber { get; set; }

        public int SouEnchou { get; set; }

        public int TankaId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public AnkenModel Anken { get; set; }

        public TankaModel Tanka { get; set; }
    }
}
