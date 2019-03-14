using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class PreviewImageModel
    {
        public int PreviewImageId { get; set; }

        public string PreviewImageData { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public ICollection<PreviewModel> Previews { get; set; }

    }
}
