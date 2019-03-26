using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AnkenModel
    {
        [JsonProperty("customerId")]
        public int CustomerId { get; set; }

        [JsonProperty("ankenId")]
        public int AnkenId { get; set; }

        [JsonProperty("ankenName")]
        public string AnkenName { get; set; }

        [JsonProperty("tunnelNumber")]
        public int TunnelNumber { get; set; }

        [JsonProperty("imageNumber")]
        public int ImageNumber { get; set; }

        [JsonProperty("cadNumber")]
        public int CadNumber { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public CustomerModel Customer { get; set; }

        public ICollection<TunnelModel> Tunnels { get; set; }
        public ICollection<AiRiyouJoukyouModel> AiRiyouJoukyous { get; set; }


    }
}
