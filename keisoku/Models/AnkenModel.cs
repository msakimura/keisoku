using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AnkenModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public string AnkenName { get; set; }

        public int TunnelNumber { get; set; }

        public int ImageNumber { get; set; }

        public int CadNumber { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
