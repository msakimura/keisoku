using System.ComponentModel.DataAnnotations;

namespace keisoku.Models
{
    public class CustomerModel
    {
        [Key]
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
    }
}
