using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class PrintModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int PrintId { get; set; }

        public int YoushiSize { get; set; }

        public int SpanNumber { get; set; }

        public int ShukushakuRitsu { get; set; }

        public int PrintDataKubun { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public TunnelModel Tunnel { get; set; }
    }
}
