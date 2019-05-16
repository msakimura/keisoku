using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AiKaisekiPdfModel
    {
        public int AiKaisekiPdfId { get; set; }

        public string PdfName { get; set; }

        public string PdfData { get; set; }

        public string BlobContainerName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<AiKaisekiModel> AiKaisekis { get; set; }
    }
}
