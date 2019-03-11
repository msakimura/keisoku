using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Models
{
    public class UploadModel
    {
        [JsonProperty("tunnelImage")]
        public byte[] TunnelImage { get; set; }
    }
}
