using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AiKaisekiCadModel
    {
        public int AiKaisekiCadId { get; set; }

        public string CadData { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<ImageAiKaisekiModel> ImageAiKaisekis { get; set; }

    }
}
