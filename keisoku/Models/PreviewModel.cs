﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class PreviewModel
    {
        public int SeikahinImageId { get; set; }

        public int PreviewImageId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public SeikahinImageModel SeikahinImage { get; set; }

        public PreviewImageModel PreviewImage { get; set; }

    }
}