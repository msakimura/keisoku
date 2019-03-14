using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class DaichouModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int DaichouId { get; set; }

        public int ExcelDaichouId { get; set; }

        public int KinsetsuTenkenPhotoId { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public TunnelModel Tunnel { get; set; }

        public ExcelDaichouModel ExcelDaichou { get; set; }

        public KinsetsuTenkenPhotoModel KinsetsuTenkenPhoto { get; set; }
    }
}
