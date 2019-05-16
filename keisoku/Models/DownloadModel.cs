﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class DownloadModel
    {
        public int Id { get; set; }

        public string FileName { get; set; }

        public string FileType { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
