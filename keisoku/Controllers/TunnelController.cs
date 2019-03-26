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
    public class TunnelController : BaseController
    {
        public TunnelController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 顧客ID、案件IDに一致する全てのトンネル情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// 
        /// <returns>トンネル情報リスト</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}")]
        public IActionResult Get([FromRoute] int customerId, int ankenId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tunnels = _context.Tunnels.Where(x => x.CustomerId == customerId && x.AnkenId == ankenId);

            if (tunnels.Count() == 0)
            {
                return NotFound();
            }


            return Ok(tunnels);
        }


        /// <summary>
        /// 顧客ID、案件ID、トンネルIDに一致するトンネル情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="tunnelId">トンネルID</param>
        /// 
        /// <returns>トンネル情報</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}/{tunnelId}")]
        public async Task<IActionResult> Get([FromRoute] int customerId, int ankenId, int tunnelId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tunnel = await _context.Tunnels.SingleOrDefaultAsync(x => x.CustomerId == customerId && x.AnkenId == ankenId && x.TunnelId == tunnelId);

            if (tunnel == null)
            {
                return NotFound();
            }


            return Ok(tunnel);
        }


        /// <summary>
        /// トンネル情報を追加する
        /// </summary>
        /// 
        /// <returns>追加したトンネル情報</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<TunnelModel>(body);


                // トンネル情報追加
                deserialized.CreatedAt = DateTime.Now;
                deserialized.UpdatedAt = DateTime.Now;

                var model = _context.Tunnels.Add(deserialized);

                await _context.SaveChangesAsync();

                var tunnel = ((ApplicationDbContext)model.Context).Tunnels.Last();


                return Ok(tunnel);
            }
        }


        /// <summary>
        /// 顧客ID、案件ID、トンネルIDに一致するトンネル情報を削除する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="tunnelId">トンネルID</param>
        /// 
        /// <returns>削除したトンネル情報</returns>
        /// 
        [HttpDelete("{customerId}/{ankenId}/{tunnelId}")]
        public async Task<IActionResult> Delete([FromRoute] int customerId, int ankenId, int tunnelId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var tunnel = await _context.Tunnels.SingleOrDefaultAsync(x => x.CustomerId == customerId && x.AnkenId == ankenId && x.TunnelId == tunnelId);
            if (tunnel == null)
            {
                return NotFound();
            }

            _context.Tunnels.Remove(tunnel);
            await _context.SaveChangesAsync();

            return Ok(tunnel);
        }


        /// <summary>
        /// トンネル情報を更新する
        /// </summary>
        /// 
        /// 
        /// <returns>処理結果</returns>
        /// 
        [HttpPut]
        public async Task<IActionResult> Put()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<TunnelModel>(body);

                deserialized.UpdatedAt = DateTime.Now;

                // ユーザ情報更新
                _context.Entry(deserialized).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IsTunnelExists(deserialized.CustomerId, deserialized.AnkenId, deserialized.TunnelId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                var putData = await Get(deserialized.CustomerId, deserialized.AnkenId, deserialized.TunnelId);

                return new ObjectResult(putData);
            }
        }


        /// <summary>
        /// 顧客ID、案件ID、トンネルIDに一致するトンネル情報が存在するか判定
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="tunnelId">トンネルｂID</param>
        /// 
        /// <returns>存在有無</returns>
        /// 
        private bool IsTunnelExists(int customerId, int ankenId, int tunnelId)
        {
            return _context.Tunnels.Any(e => e.CustomerId == customerId && e.AnkenId == ankenId && e.TunnelId == tunnelId);
        }
    }
}