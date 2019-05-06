using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class SeikahinImageModel
    {
        public int SeikahinImageId { get; set; }

        public string ImageName { get; set; }

        public string ImageData { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public string HibiChushutsu { get; set; }

        public string Sonshou { get; set; }

        public string HibiBunrui { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<TunnelImageModel> TunnelImages { get; set; }

        public ICollection<PreviewModel> Previews { get; set; }

        public ICollection<AiKaisekiCadModel> AiKaisekiCads { get; set; }

        public ICollection<AiKaisekiPdfModel> AiKaisekiPdfs { get; set; }

        public ICollection<ImageOrderSetModel> ImageOrderSets { get; set; }

        public ICollection<ImageOrderDetailModel> ImageOrderDetails { get; set; }

    }
}
