using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace keisoku.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class TunnelImageController : BaseController
    {
        public TunnelImageController(ApplicationDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// 顧客ID、案件ID、トンネルIDに一致する全てのトンネル画像情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="tunnelId">トンネルID</param>
        /// 
        /// <returns>トンネル画像情報リスト</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}/{tunnelId}")]
        public IActionResult Get([FromRoute] int customerId, int ankenId, int tunnelId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tunnelImages = _context.TunnelImages.Where(x => x.CustomerId == customerId && x.AnkenId == ankenId && x.TunnelId == tunnelId);

            if (tunnelImages.Count() == 0)
            {
                return NotFound();
            }


            return Ok(tunnelImages);
        }


        /// <summary>
        /// トンネル画像情報を追加する
        /// </summary>
        /// 
        /// <returns>追加したトンネル画像情報</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                //Azure Blob Storageにアップロード
                string accountname = "keisokuaccount";

                string accesskey = "DchFUYDdOuIh0z2XICJ5xXs07aOwCgeXkWpMBqJliclpVyOk0s2hiOVnBJYdXtdaEsS+DAU/K4ldtpgOfS1mHQ==";

                var credential = new StorageCredentials(accountname, accesskey);
                var storageAccount = new CloudStorageAccount(credential, true);

                //blob
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                //container
                CloudBlobContainer container = blobClient.GetContainerReference("tunnel");



                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<TunnelImageModel>(body);

                
                var base64 = Convert.FromBase64String(deserialized.SeikahinImage.ImageData);

                MemoryStream fileStream = new MemoryStream(base64);

                CloudBlockBlob blockBlob_upload = container.GetBlockBlobReference(deserialized.SeikahinImage.ImageName);

                await blockBlob_upload.UploadFromStreamAsync(fileStream);
            
                
                return Ok();
            }
        }
    }
    
}