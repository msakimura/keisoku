using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class KinsetsuTenkenPhotoModel
    {
        public int KinsetsuTenkenPhotoId { get; set; }

        public string KinsetsuTenkenPhotoData { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<DaichouModel> Daichous { get; set; }
    }
}
