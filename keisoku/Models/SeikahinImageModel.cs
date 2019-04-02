using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class SeikahinImageModel
    {
        [JsonProperty("seikahinImageId")]
        public int SeikahinImageId { get; set; }

        [JsonProperty("imageName")]
        public string ImageName { get; set; }

        [JsonProperty("imageData")]
        public string ImageData { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("hibiChushutsu")]
        public string HibiChushutsu { get; set; }

        [JsonProperty("sonshou")]
        public string Sonshou { get; set; }

        [JsonProperty("hibiBunrui")]
        public string HibiBunrui { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<TunnelImageModel> TunnelImages { get; set; }

        public ICollection<PreviewModel> Previews { get; set; }

        public ICollection<ImageAiKaisekiModel> ImageAiKaisekis { get; set; }

    }
}
