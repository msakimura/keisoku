using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class ExcelDaichouModel
    {
        public int ExcelDaichouId { get; set; }

        public string ExcelDaichouName { get; set; }

        public string ExcelDaichouData { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<DaichouModel> Daichous { get; set; }
    }
}
