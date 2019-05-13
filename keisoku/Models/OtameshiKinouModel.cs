using System;
using System.Collections.Generic;

namespace keisoku.Models
{
    public class OtameshiKinouModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual TunnelModel Tunnel { get; set; }

        public ICollection<TunnelImageModel> TunnelImages { get; set; }

        public ICollection<OtameshiPreviewModel> OtameshiPreviews { get; set; }

    }
}
