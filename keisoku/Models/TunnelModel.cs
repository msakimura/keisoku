using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class TunnelModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public string TunnelName { get; set; }

        public int TunnelEnchou { get; set; }

        public int YoteiImageNumber { get; set; }

        public int ImageNumber { get; set; }

        public int AiNumber { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public AnkenModel Anken { get; set; }

        public ICollection<TunnelImageModel> TunnelImages { get; set; }

        public ICollection<KanseiCadModel> KanseiCads { get; set; }

        public ICollection<DaichouModel> Daichous { get; set; }

        public ICollection<CadInputInfoModel> CadInputInfos { get; set; }

        public ICollection<WebInputInfoModel> WebInputInfos { get; set; }

        public ICollection<PrintModel> Prints { get; set; }

        public ICollection<SummaryModel> Summaries { get; set; }

    }
}
