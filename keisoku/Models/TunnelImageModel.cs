using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class TunnelImageModel
    {
        [JsonProperty("customerId")]
        public int CustomerId { get; set; }

        [JsonProperty("ankenId")]
        public int AnkenId { get; set; }

        [JsonProperty("tunnelId")]
        public int TunnelId { get; set; }

        [JsonProperty("tunnelImageId")]
        public int TunnelImageId { get; set; }

        [JsonProperty("seikahinImageId")]
        public int SeikahinImageId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public TunnelModel Tunnel { get; set; }

        public SeikahinImageModel SeikahinImage { get; set; }

    }
}
