using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class PrintSetModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public string CadVersion { get; set; }

        public string CadPdfPrintPaperSize { get; set; }

        public int PrintLayoutTopMargin { get; set; }

        public int PrintLayoutBottomMargin { get; set; }
        
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public TunnelModel Tunnel { get; set; }

        public ICollection<PrintDetailModel> PrintDetails { get; set; }
    }
}
