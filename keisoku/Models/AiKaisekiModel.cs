using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AiKaisekiModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int AiKaisekiCadId { get; set; }

        public int AiKaisekiPdfId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public TunnelModel Tunnel { get; set; }

        public ICollection<AiKaisekiCadModel> AiKaisekiCads { get; set; }

        public ICollection<AiKaisekiPdfModel> AiKaisekiPdfs { get; set; }

    }
}
