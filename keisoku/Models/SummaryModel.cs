using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class SummaryModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int SummaryId { get; set; }

        public int CsvId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public TunnelModel Tunnel { get; set; }

        public CsvModel Csv { get; set; }
    }
}
