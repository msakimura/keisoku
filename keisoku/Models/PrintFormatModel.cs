using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class PrintFormatModel
    {
        public int PrintFormatId { get; set; }

        public int PrintFormatKubun { get; set; }

        public string PrintFormatName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<PrintDetailModel> PrintDetails { get; set; }

    }
}
