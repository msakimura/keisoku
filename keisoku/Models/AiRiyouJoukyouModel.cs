﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class AiRiyouJoukyouModel
    {
        public int CustomerId { get; set; }

        public int AnkenId { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int TunnelNumber { get; set; }

        public int SouEnchou { get; set; }

        public int TankaId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public AnkenModel Anken { get; set; }

        public TankaModel Tanka { get; set; }
    }
}
