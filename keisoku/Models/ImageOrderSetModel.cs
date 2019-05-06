using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class ImageOrderSetModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int SeikahinImageId { get; set; }

        public int WidthOrHeight { get; set; }

        public int Length { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual TunnelModel Tunnel { get; set; }

        public virtual SeikahinImageModel SeikahinImage { get; set; }

        public ICollection<ImageOrderDetailModel> ImageOrderDetails { get; set; }

    }
}
