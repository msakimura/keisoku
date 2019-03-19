﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class ImageAiKaisekiModel
    {
        public int SeikahinImageId { get; set; }

        public int AiKaisekiCadId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public SeikahinImageModel SeikahinImage { get; set; }

        public AiKaisekiCadModel AiKaisekiCad { get; set; }
    }
}