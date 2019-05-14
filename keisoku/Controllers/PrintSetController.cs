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
    public class PrintSetController : ControllerBase
    {
        private ApplicationDbContext _context;

        public PrintSetController(ApplicationDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// 顧客ID、案件ID、トンネルIDに一致する出力設定情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="tunnelId">トンネルID</param>
        /// 
        /// <returns>出力設定情報</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}/{tunnelId}")]
        public async Task<IActionResult> Get([FromRoute] int customerId, int ankenId, int tunnelId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var printSets = _context.PrintSets
                .Where(x => x.CustomerId == customerId && x.AnkenId == ankenId && x.TunnelId == tunnelId);

            if (!printSets.Any())
            {
                return NotFound();
            }


            return Ok(await printSets.SingleOrDefaultAsync());
        }

        /// <summary>
        /// 出力設定情報を追加する
        /// </summary>
        /// 
        /// <returns>追加した出力設定情報</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<PrintSetModel>(body);


                // 出力設定情報追加
                deserialized.CreatedAt = DateTime.Now;
                deserialized.UpdatedAt = DateTime.Now;

                var printSet = await _context.PrintSets.SingleOrDefaultAsync(
                    x => x.CustomerId == deserialized.CustomerId && x.AnkenId == deserialized.AnkenId && x.TunnelId == deserialized.TunnelId);
                if (printSet != null)
                {
                    _context.PrintSets.Remove(printSet);

                }

                var model = _context.PrintSets.Add(deserialized);

                await _context.SaveChangesAsync();

                var addedPrintSet = ((ApplicationDbContext)model.Context).PrintSets.Last();


                return Ok(addedPrintSet);
            }
        }
    }
}