using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AiKaisekiCadModel
    {
        public int SeikahinImageId { get; set; }

        public string CadName { get; set; }

        public string CadData { get; set; }

        public string BlobContainerName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public SeikahinImageModel SeikahinImage { get; set; }

    }
}
