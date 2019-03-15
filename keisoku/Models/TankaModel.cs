using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class TankaModel
    {
        public int TankaId { get; set; }

        public string Tanka { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<AiRiyouJoukyouModel> AiRiyouJoukyous { get; set; }

    }
}
