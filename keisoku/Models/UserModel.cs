using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class UserModel
    {
        [JsonProperty("customerId")]
        public int CustomerId { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("loginId")]
        public string LoginId { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public CustomerModel Customer { get; set; }

        [JsonProperty("kengenFuyos")]
        public ICollection<KengenFuyoModel> KengenFuyos { get; set; }
    }
}
