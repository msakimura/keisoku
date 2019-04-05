using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnkenController : BaseController
    {
        public AnkenController(ApplicationDbContext context)
        {
            _context = context;
        }

        
        /// <summary>
        /// 顧客IDに一致する全ての案件情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// 
        /// <returns>案件情報リスト</returns>
        /// 
        [HttpGet("{customerId}")]
        public IActionResult Get([FromRoute] int customerId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ankens = _context.Ankens.Where(x => x.CustomerId == customerId);

            if (!ankens.Any())
            {
                return NotFound();
            }


            return Ok(ankens);
        }


        /// <summary>
        /// 顧客ID、案件IDに一致する案件情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// 
        /// <returns>案件情報</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}")]
        public async Task<IActionResult> Get([FromRoute] int customerId, int ankenId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var anken = await _context.Ankens.SingleOrDefaultAsync(x => x.CustomerId == customerId && x.AnkenId == ankenId);

            if (anken == null)
            {
                return NotFound();
            }
            

            return Ok(anken);
        }


        /// <summary>
        /// 案件情報を追加する
        /// </summary>
        /// 
        /// <returns>追加した案件情報</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<AnkenModel>(body);


                // 案件情報追加
                deserialized.CreatedAt = DateTime.Now;
                deserialized.UpdatedAt = DateTime.Now;
                
                var model = _context.Ankens.Add(deserialized);

                await _context.SaveChangesAsync();

                var anken = ((ApplicationDbContext)model.Context).Ankens.Last();
                

                return Ok(anken);
            }
        }


        /// <summary>
        /// 顧客ID、案件IDに一致する案件情報を削除する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// 
        /// <returns>削除した案件情報</returns>
        /// 
        [HttpDelete("{customerId}/{ankenId}")]
        public async Task<IActionResult> Delete([FromRoute] int customerId, int ankenId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var anken = await _context.Ankens.SingleOrDefaultAsync(x => x.CustomerId == customerId && x.AnkenId == ankenId);
            if (anken == null)
            {
                return NotFound();
            }

            _context.Ankens.Remove(anken);
            await _context.SaveChangesAsync();

            return Ok(anken);
        }


        /// <summary>
        /// 案件情報を更新する
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

                var deserialized = JsonConvert.DeserializeObject<AnkenModel>(body);

                deserialized.UpdatedAt = DateTime.Now;

                // ユーザ情報更新
                _context.Entry(deserialized).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IsAnkenExists(deserialized.CustomerId, deserialized.AnkenId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                var putData = await Get(deserialized.CustomerId, deserialized.AnkenId);

                return new ObjectResult(putData);
            }
        }


        /// <summary>
        /// 顧客ID、案件IDに一致する案件が存在するか判定
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// 
        /// <returns>存在有無</returns>
        /// 
        private bool IsAnkenExists(int customerId, int ankenId)
        {
            return _context.Ankens.Any(e => e.CustomerId == customerId && e.AnkenId == ankenId);
        }
    }
}