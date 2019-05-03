using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Data;
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
    public class SeikahinImageController : ControllerBase
    {
        private ApplicationDbContext _context;

        public SeikahinImageController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 画像名に一致する成果品画像情報を取得する
        /// </summary>
        /// 
        /// <param name="imageName">画像名</param>
        /// 
        /// <returns>成果品画像情報</returns>
        /// 
        [HttpGet("{imageName}")]
        public IActionResult Get([FromRoute] string imageName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var seikahinImage = _context.SeikahinImages.Where(x => x.ImageName == imageName).SingleOrDefault();

            
            return Ok(seikahinImage);
        }

        /// <summary>
        /// 成果品画像情報を追加する
        /// </summary>
        /// 
        /// <returns>追加した成果品画像情報</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<SeikahinImageModel>(body);


                // 成果品画像情報が追加済みの場合、DB内の成果品画像情報を返して終了する
                if (IsSeikahinImageExists(deserialized.ImageName))
                {
                    var result = Get(deserialized.ImageName);
                    return result;
                }


                // 成果品画像をアップロード
                await Upload(deserialized);



                // 成果品画像情報をテーブルに追加
                deserialized.CreatedAt = DateTime.Now;
                deserialized.UpdatedAt = DateTime.Now;

                var model = _context. SeikahinImages.Add(deserialized);

                await _context.SaveChangesAsync();

                var seikahinImage = ((ApplicationDbContext)model.Context).SeikahinImages.Last();


                return Ok(seikahinImage);
            }
        }

        /// <summary>
        /// 成果品画像をアップロードする
        /// </summary>
        /// 
        /// <returns>アップロード結果</returns>
        /// 
        public async Task<IActionResult> Upload(SeikahinImageModel seikahinImage)
        {
            var base64 = Convert.FromBase64String(seikahinImage.ImageData);

            MemoryStream fileStream = new MemoryStream(base64);


            //Azure Blob Storageにアップロード
            var credential = new StorageCredentials(ApplicationConstants.AZURE_BLOB_STORAGE_ACCOUNTNAME, ApplicationConstants.AZURE_BLOB_STORAGE_ACCESSKEY);
            var storageAccount = new CloudStorageAccount(credential, true);
            
            //blob
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            //container
            CloudBlobContainer container = blobClient.GetContainerReference(ApplicationConstants.AZURE_BLOB_STORAGE_CONTAINER);

            CloudBlockBlob blockBlob_upload = container.GetBlockBlobReference(seikahinImage.ImageName);

            await blockBlob_upload.UploadFromStreamAsync(fileStream);


            var blob = container.GetBlobReference(seikahinImage.ImageName);
            seikahinImage.ImageData = blob.Uri.OriginalString;

            Bitmap image = new Bitmap(fileStream, false);
            seikahinImage.Width = image.Width;
            seikahinImage.Height = image.Height;

            return Ok();
        }


        /// <summary>
        /// 画像名に一致する成果品画像が存在するか判定
        /// </summary>
        /// 
        /// <param name="imageName">画像名</param>
        /// 
        /// <returns>存在有無</returns>
        /// 
        private bool IsSeikahinImageExists(string imageName)
        {
            return _context.SeikahinImages.Any(e => e.ImageName == imageName);
        }
    }
}