using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        private ApplicationDbContext _context;

        public DownloadController(ApplicationDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// 顧客ID、案件IDに一致するCAD設定情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// 
        /// <returns>CAD設定情報</returns>
        /// 
        [HttpGet]
        public async Task<FileContentResult> Get(string param)
        {
            var deserialized = JsonConvert.DeserializeObject<IEnumerable<DownloadModel>>(param);

            var credential = new StorageCredentials(ApplicationConstants.AZURE_BLOB_STORAGE_ACCOUNTNAME, ApplicationConstants.AZURE_BLOB_STORAGE_ACCESSKEY);
            var storageAccount = new CloudStorageAccount(credential, true);

            //blob
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            //container
            CloudBlobContainer container = blobClient.GetContainerReference(ApplicationConstants.AZURE_BLOB_STORAGE_CONTAINER);
            

            using (MemoryStream zipStream = new MemoryStream())
            {

                using (var zip = new ZipArchive(zipStream, ZipArchiveMode.Create, true))
                {

                    foreach (var data in deserialized)
                    {
                        //ダウンロードするファイル名を指定
                        CloudBlockBlob blockBlob_download = container.GetBlockBlobReference(data.FileName);

                        //ダウンロード処理
                        var memory = new MemoryStream();

                        await blockBlob_download.DownloadToStreamAsync(memory);


                        var entry = zip.CreateEntry(data.FileName);
                        using (var entryStream = entry.Open())
                        {
                            await memory.CopyToAsync(entryStream);
                        }
                    }
                }

                //zipStream.Position = 0;
                

                return new FileContentResult(zipStream.GetBuffer(), "application/octet-stream");
            }

            
        }

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