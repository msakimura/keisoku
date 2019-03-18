using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class KengenFuyoModel
    {
        [JsonProperty("customerId")]
        public int CustomerId { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("kengenId")]
        public int KengenId {get; set;}

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        [JsonProperty("user")]
        public UserModel User { get; set; }

        public KengenModel Kengen { get; set; }
    }
}
