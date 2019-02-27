using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {

        [HttpGet("{filename}")]
        public async Task<IActionResult> Download(string filename)
        {
            string accountname = "keisokuaccount";

            string accesskey = "DchFUYDdOuIh0z2XICJ5xXs07aOwCgeXkWpMBqJliclpVyOk0s2hiOVnBJYdXtdaEsS+DAU/K4ldtpgOfS1mHQ==";

            var credential = new StorageCredentials(accountname, accesskey);
            var storageAccount = new CloudStorageAccount(credential, true);

            //blob
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            //container
            CloudBlobContainer container = blobClient.GetContainerReference("tunnel");

            //ダウンロードするファイル名を指定
            CloudBlockBlob blockBlob_download = container.GetBlockBlobReference(filename);

            //ダウンロード処理
            var memory = new MemoryStream();

            await blockBlob_download.DownloadToStreamAsync(memory);

            return Ok(memory);
        }
    }
}