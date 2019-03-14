using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class CsvModel
    {
        public int CsvId { get; set; }

        public string CsvName { get; set; }

        public string CsvData { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public ICollection<SummaryModel> Summaries { get; set; }
    }
}
