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

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public AnkenModel Anken { get; set; }

        public ICollection<TunnelImageModel> TunnelImages { get; set; }

        public ICollection<EditCadModel> KanseiCads { get; set; }

        public ICollection<DaichouModel> Daichous { get; set; }
        
        public ICollection<PrintSetModel> PrintSets { get; set; }

        public ICollection<SummaryModel> Summaries { get; set; }

        public ICollection<OtameshiKinouModel> OtameshiKinous { get; set; }

        public ICollection<HibiwareShoriSetModel> HibiwareShoriSets { get; set; }

        public ICollection<ImageOrderSetModel> ImageOrderSets { get; set; }

        public ICollection<KakinModel> Kakins { get; set; }

        public ICollection<AiKaisekiModel> AiKaisekis { get; set; }

        public ICollection<FileShareModel> FileShares { get; set; }
        
    }
}
