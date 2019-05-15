using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class CadSetModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int CadSetId { get; set; }
        public int CadVersion { get; set; }

        public int CadPdfPrintPaperSize { get; set; }

        public decimal PrintLayoutTopSpace { get; set; }

        public decimal PrintLayoutBottomSpace { get; set; }

        public decimal SpanMojiSize { get; set; }

        public int SpanMojiPosition { get; set; }

        public int SpanMojiDirection { get; set; }

        public int CadUnit { get; set; }

        public int ImageCreateOrder { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public AnkenModel Anken { get; set; }
    }
}
