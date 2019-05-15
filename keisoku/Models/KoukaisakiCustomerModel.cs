using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class KoukaisakiCustomerModel
    {

        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int KoukaisakiCustomerId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public AnkenModel Anken { get; set; }

    }
}
