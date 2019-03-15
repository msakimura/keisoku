using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class CadInputInfoModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int CadInputInfoId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public TunnelModel Tunnel { get; set; }
    }
}
