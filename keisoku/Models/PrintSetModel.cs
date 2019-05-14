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

        public bool DnnAndGenImage { get; set; }

        public bool DnnOnlyGenImage { get; set; }

        public bool Cad { get; set; }

        public bool CadAndImage { get; set; }

        public bool Pdf { get; set; }

        public bool PdfAndImage { get; set; }

        public decimal ImageCompressionRatio { get; set; }
        
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public TunnelModel Tunnel { get; set; }
        
    }
}
