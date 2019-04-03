﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using keisoku.Data;
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
        public async Task<FileContentResult> Download(string filename)
        {
            var credential = new StorageCredentials(ApplicationConstants.AZURE_BLOB_STORAGE_ACCOUNTNAME, ApplicationConstants.AZURE_BLOB_STORAGE_ACCESSKEY);
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

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new StreamContent(memory);
            result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
            {
                FileName = filename
            };
            result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

            return new FileContentResult(memory.GetBuffer(), "application/octet-stream");
        }
        
    }

}