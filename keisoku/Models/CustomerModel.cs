using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace keisoku.Models
{
    [Table("Customers", Schema = "keisoku")]
    public class CustomerModel
    {
        [Key]
        [JsonProperty("customerId")]
        public int CustomerId { get; set; }
        [JsonProperty("customerName")]
        public string CustomerName { get; set; }
    }
}
