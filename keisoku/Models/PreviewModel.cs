using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class PreviewModel
    {
        public int SeikahinImageId { get; set; }

        public string PreviewImageName { get; set; }

        public string PreviewImageData { get; set; }

        public string BlobContainerName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public SeikahinImageModel SeikahinImage { get; set; }

    }
}
