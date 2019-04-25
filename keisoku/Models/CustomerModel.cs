using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace keisoku.Models
{
    public class CustomerModel
    {
        [JsonProperty("customerId")]
        public int CustomerId { get; set; }

        [JsonProperty("customerName")]
        public string CustomerName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<UserModel> Users { get; set; }

        public ICollection<AnkenModel> Ankens { get; set; }

        public ICollection<OptionFuyoModel> OptionFuyos { get; set; }
    }
}
