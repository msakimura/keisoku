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
    public class HibiwareshoriSetController : ControllerBase
    {
        private ApplicationDbContext _context;

        public HibiwareshoriSetController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 顧客ID、案件ID、トンネルIDに一致するひび割れ処理設定情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="tunnelId">トンネルID</param>
        /// 
        /// <returns>ひび割れ処理設定情報</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}/{tunnelId}")]
        public IActionResult Get([FromRoute] int customerId, int ankenId, int tunnelId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var hibiwareShoriSets = 
                _context.HibiwareShoriSets.Where(x => x.CustomerId == customerId && x.AnkenId == ankenId && x.TunnelId == tunnelId);

            if (!hibiwareShoriSets.Any())
            {
                return NotFound();
            }


            return Ok(hibiwareShoriSets.SingleOrDefault());
        }


        /// <summary>
        /// ひび割れ処理設定情報を追加する
        /// </summary>
        /// 
        /// <returns>追加したひび割れ処理設定情報</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<HibiwareShoriSetModel>(body);


                // ひび割れ処理設定情報追加
                deserialized.CreatedAt = DateTime.Now;
                deserialized.UpdatedAt = DateTime.Now;

                var hibiwareShoriSet = await _context.HibiwareShoriSets.SingleOrDefaultAsync(
                    x => x.CustomerId == deserialized.CustomerId && x.AnkenId == deserialized.AnkenId && x.TunnelId == deserialized.TunnelId);
                if (hibiwareShoriSet != null)
                {
                    _context.HibiwareShoriSets.Remove(hibiwareShoriSet);

                }

                var model = _context.HibiwareShoriSets.Add(deserialized);

                await _context.SaveChangesAsync();

                var addedHibiwareShoriSet = ((ApplicationDbContext)model.Context).HibiwareShoriSets.Last();


                return Ok(addedHibiwareShoriSet);
            }
        }
    }
}