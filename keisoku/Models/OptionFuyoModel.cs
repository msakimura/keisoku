﻿using System;

namespace keisoku.Models
{
    public class OptionFuyoModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int TunnelId { get; set; }

        public int OptionId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual TunnelModel Tunnel { get; set; }

        public OptionModel Option { get; set; }

    }
}
