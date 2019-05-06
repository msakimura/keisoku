using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class ImageOrderDetailModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int ImageOrderDetailId { get; set; }

        public int SeikahinImageId { get; set; }

        public string SpanMoji { get; set; }

        public int ImageAlignPosition { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ImageOrderSetModel ImageOrderSet { get; set; }

        public virtual SeikahinImageModel SeikahinImage { get; set; }

    }
}
