using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
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
        public async Task<IActionResult> Get(string param)
        {
            var deserialized = JsonConvert.DeserializeObject<IEnumerable<DownloadModel>>(param);

            var credential = new StorageCredentials(ApplicationConstants.AZURE_BLOB_STORAGE_ACCOUNTNAME, ApplicationConstants.AZURE_BLOB_STORAGE_ACCESSKEY);
            var storageAccount = new CloudStorageAccount(credential, true);

            //blob
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            //container
            CloudBlobContainer container = blobClient.GetContainerReference(ApplicationConstants.AZURE_BLOB_STORAGE_CONTAINER);
;
            byte[] fileBytes = null;

            using (var zipMemoryStream = new System.IO.MemoryStream())
            {
                // メモリストリーム上にZipArchiveを作成する
                using (var zipArchive = new ZipArchive(zipMemoryStream, ZipArchiveMode.Create, true))
                {
                    foreach (var data in deserialized)
                    {
                        // ダウンロードするファイル名を指定
                        CloudBlockBlob blockBlob_download = container.GetBlockBlobReference(data.FileName);

                        // ダウンロード処理
                        var fileMemoryStream = new MemoryStream();

                        await blockBlob_download.DownloadToStreamAsync(fileMemoryStream);

                        // ファイルを追加していく。
                        var entry = zipArchive.CreateEntry(data.FileName);
                        using (var entryStream = entry.Open())
                        {
                            // エントリにバイナリを書き込む
                            await entryStream.WriteAsync(fileMemoryStream.GetBuffer(), 0, fileMemoryStream.GetBuffer().Length);
                        }
                    }
                }

                fileBytes = zipMemoryStream.ToArray();
            }

            return File(fileBytes, "application/zip");
            
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