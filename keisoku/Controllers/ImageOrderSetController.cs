using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageOrderSetController : ControllerBase
    {
        private ApplicationDbContext _context;

        public ImageOrderSetController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 顧客ID、案件ID、トンネルIDに一致する全ての画像並び設定情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="tunnelId">トンネルID</param>
        /// 
        /// <returns>画像並び設定情報</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}/{tunnelId}")]
        public IActionResult Get([FromRoute] int customerId, int ankenId, int tunnelId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DbSet<ImageOrderSetModel> imageOrderSets = _context.ImageOrderSets;
            DbSet<SeikahinImageModel> seikahinImages = _context.SeikahinImages;

            var query = from imageOrderSet in imageOrderSets
                        join seikahinImage in seikahinImages
                        on imageOrderSet.SeikahinImageId equals seikahinImage.SeikahinImageId
                        select new
                        {
                            imageOrderSet,
                            seikahinImage.ImageName
                        };

            if (!query.Any())
            {
                return NotFound();
            }


            return Ok(query);
            
        }

        /// <summary>
        /// 画像並び設定情報を追加する
        /// </summary>
        /// 
        /// <returns>追加した画像並び設定情報</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<IEnumerable<ImageOrderSetModel>>(body);


                // 画像並び設定情報追加
                foreach(var data in deserialized)
                {
                    data.CreatedAt = DateTime.Now;
                    data.UpdatedAt = DateTime.Now;
                }

                var firstData = deserialized.First();

                var imageOrderSets = _context.ImageOrderSets.Where(
                    x => x.CustomerId == firstData.CustomerId && x.AnkenId == firstData.AnkenId && x.TunnelId == firstData.TunnelId);
                if (imageOrderSets.Any())
                {
                    _context.ImageOrderSets.RemoveRange(imageOrderSets);

                }

                var model = _context.ImageOrderSets.AddRangeAsync(deserialized);

                await _context.SaveChangesAsync();
                
                return Ok();
            }
        }
    }
}