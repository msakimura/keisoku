using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                // リクエストされた画像を読み込む
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<UploadModel>(body);

                var base64 = Convert.FromBase64String(deserialized.FileData);

                MemoryStream fileStream = new MemoryStream(base64);

                //Azure Blob Storageにアップロード
                string accountname = "keisokuaccount";

                string accesskey = "DchFUYDdOuIh0z2XICJ5xXs07aOwCgeXkWpMBqJliclpVyOk0s2hiOVnBJYdXtdaEsS+DAU/K4ldtpgOfS1mHQ==";

                var credential = new StorageCredentials(accountname, accesskey);
                var storageAccount = new CloudStorageAccount(credential, true);

                //blob
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                //container
                CloudBlobContainer container = blobClient.GetContainerReference("tunnel");

                CloudBlockBlob blockBlob_upload = container.GetBlockBlobReference(deserialized.FileName);

                await blockBlob_upload.UploadFromStreamAsync(fileStream);
            }
            

            return Ok();
        }
    }
}