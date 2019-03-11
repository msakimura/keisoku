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
                var body = reader.ReadToEnd();

                //var deserialized = JsonConvert.DeserializeObject<List<UploadModel>>(body);
            }

            //string accountname = "keisokuaccount";

            //string accesskey = "DchFUYDdOuIh0z2XICJ5xXs07aOwCgeXkWpMBqJliclpVyOk0s2hiOVnBJYdXtdaEsS+DAU/K4ldtpgOfS1mHQ==";

            //var credential = new StorageCredentials(accountname, accesskey);
            //var storageAccount = new CloudStorageAccount(credential, true);

            ////blob
            //CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            ////container
            //CloudBlobContainer container = blobClient.GetContainerReference("tunnel");

            //foreach (var file in Request.Form.Files)
            //{

            //    if (file.Length > 0)
            //    {
            //        //アップロード後のファイル名を指定（無くてよい）
            //        CloudBlockBlob blockBlob_upload = container.GetBlockBlobReference(file.FileName);

            //        //アップロード処理
            //        //アップロードしたいローカルのファイルを指定
            //        using (var fileStream = file.OpenReadStream())
            //        {
            //            System.Diagnostics.Trace.WriteLine(DateTime.Now.ToLongTimeString());

            //            await blockBlob_upload.UploadFromStreamAsync(fileStream);
            //            System.Diagnostics.Trace.WriteLine(DateTime.Now.ToLongTimeString());

            //        }

            //    }
            //}

            return Ok();
        }
    }
}