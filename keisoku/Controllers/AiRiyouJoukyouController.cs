using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AiRiyouJoukyouController : BaseController
    {
        public AiRiyouJoukyouController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 顧客ID、案件IDに一致する全てのAI利用状況情報を取得する
        /// </summary>
        /// 
        /// <remarks>
        /// 顧客ID、案件IDに一致するAI利用状況を年月単位で集計する
        /// 該当するAI利用状況がテーブルに追加されている場合、更新する
        /// 該当するAI利用状況がテーブルに追加されていない場合、追加する
        /// 集計したAI利用状況情報を返す
        /// </remarks>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// 
        /// <returns>AI利用状況リスト</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}")]
        public async Task<IActionResult> GetAsync([FromRoute] int customerId, int ankenId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await CreateAsync(customerId, ankenId);


            DbSet<AiRiyouJoukyouModel> aiRiyouJoukyous = _context.AiRiyouJoukyous;
            DbSet<TankaModel> tankas = _context.Tankas;


            var query =
                aiRiyouJoukyous.Join(
                    tankas,
                    aiRiyouJoukyou => aiRiyouJoukyou.TankaId,
                    tanka => tanka.TankaId,
                    (aiRiyouJoukyou, tanka) => new
                    {
                        aiRiyouJoukyou.CustomerId,
                        aiRiyouJoukyou.AnkenId,
                        aiRiyouJoukyou.Year,
                        aiRiyouJoukyou.Month,
                        aiRiyouJoukyou.TunnelNumber,
                        aiRiyouJoukyou.SouEnchou,
                        aiRiyouJoukyou.TankaId,
                        tanka.Tanka
                    }
                    )
                    .Where(x => x.CustomerId == customerId && x.AnkenId == ankenId)
                    .OrderByDescending(x => x.Year).ThenByDescending(x => x.Month);

            return Ok(query);
        }


        /// <summary>
        /// 顧客ID、案件IDに一致する全てのAI利用状況情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// 
        /// 
        private async Task CreateAsync(int customerId, int ankenId)
        {

            DbSet<AnkenModel> ankens = _context.Ankens;
            DbSet<TunnelModel> tunnels = _context.Tunnels;

            var query =
                ankens.Join(
                    tunnels,
                    anken => new { anken.CustomerId, anken.AnkenId },
                    tunnel => new { tunnel.CustomerId, tunnel.AnkenId },
                    (anken, tunnel) => new
                    {
                        anken.CustomerId,
                        anken.AnkenId,
                        tunnel.CreatedAt,
                        tunnel.TunnelEnchou
                    }
                    )
                    .Where(x => x.CustomerId == customerId && x.AnkenId == ankenId)
                    .GroupBy(x => x.CreatedAt.ToString("yyyyMM"));

            if (!query.Any())
            {
                return;
            }


            // 取得した情報について、顧客ID、案件ID、年、月をキーにAI利用状況を検索し
            // 該当するAI利用状況が存在する場合、AI利用状況を取得した情報で更新
            // 該当するAI利用状況が存在しない場合、取得した情報をAI利用状況テーブルに追加
            foreach (var data in query)
            {
                var first = data.Select(x => x).First();

                int.TryParse(data.Key.Substring(0, 4), out int year);

                int.TryParse(data.Key.Substring(4, 2), out int month);

                bool hasAiRiyouJoukyou = await IsAiRiyouJoukyouExistsAsync(first.CustomerId, first.AnkenId, year, month);

                if (hasAiRiyouJoukyou)
                {
                    await UpdateAsync(data);
                }
                else
                {
                    await InsertAsync(data);
                }

            }

            await _context.SaveChangesAsync();

        }


        /// <summary>
        /// AI利用状況情報を追加する
        /// </summary>
        /// 
        /// <param name="aiRiyouJoukyou">AI利用状況情報</param>
        /// 
        /// 
        private async Task InsertAsync(IGrouping<string, dynamic> aiRiyouJoukyou)
        {
            if (!aiRiyouJoukyou.Any())
            {
                return;
            }

            var first = aiRiyouJoukyou.Select(x => x).First();

            int.TryParse(aiRiyouJoukyou.Key.Substring(0, 4), out int year);

            int.TryParse(aiRiyouJoukyou.Key.Substring(4, 2), out int month);

            var tunnelNumber = aiRiyouJoukyou.Count();

            var souEnchou = aiRiyouJoukyou.Sum(x => x.TunnelEnchou);

            await _context.AiRiyouJoukyous.AddAsync(new AiRiyouJoukyouModel {
                CustomerId = first.CustomerId,
                AnkenId = first.AnkenId,
                Year = year,
                Month = month,
                TunnelNumber = tunnelNumber,
                SouEnchou = souEnchou,
                TankaId = 1,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            });
        }


        /// <summary>
        /// AI利用状況情報を更新する
        /// </summary>
        /// 
        /// <param name="aiRiyouJoukyou">AI利用状況情報</param>
        /// 
        /// 
        private async Task UpdateAsync(IGrouping<string, dynamic> aiRiyouJoukyou)
        {
            if (!aiRiyouJoukyou.Any())
            {
                return;
            }

            var first = aiRiyouJoukyou.Select(x => x).First();

            int.TryParse(aiRiyouJoukyou.Key.Substring(0, 4), out int year);

            int.TryParse(aiRiyouJoukyou.Key.Substring(4, 2), out int month);

            var tunnelNumber = aiRiyouJoukyou.Count();

            var souEnchou = aiRiyouJoukyou.Sum(x => x.TunnelEnchou);

            AiRiyouJoukyouModel model = await GetAiRiyouJoukyouAsync(first.CustomerId, first.AnkenId, year, month);

            if(model.TunnelNumber != tunnelNumber || model.SouEnchou != souEnchou)
            {
                model.TunnelNumber = tunnelNumber;
                model.SouEnchou = souEnchou;
                model.UpdatedAt = DateTime.Now;

                _context.Entry(model).State = EntityState.Modified;

            }

        }


        /// <summary>
        /// 顧客ID、案件ID、年、月に一致するAI利用状況が存在するか判定
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="year">年</param>
        /// <param name="month">月</param>
        /// 
        /// <returns>存在有無</returns>
        /// 
        private async Task<bool> IsAiRiyouJoukyouExistsAsync(int customerId, int ankenId, int year, int month)
        {
            return await _context.AiRiyouJoukyous.AnyAsync(
                e => e.CustomerId == customerId && e.AnkenId == ankenId && e.Year == year && e.Month == month);
        }


        /// <summary>
        /// 顧客ID、案件ID、年、月に一致するAI利用状況を取得
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="year">年</param>
        /// <param name="month">月</param>
        /// 
        /// <returns>AI利用状況</returns>
        /// 
        private async Task<AiRiyouJoukyouModel> GetAiRiyouJoukyouAsync(int customerId, int ankenId, int year, int month)
        {
            return await _context.AiRiyouJoukyous.Where(
                e => e.CustomerId == customerId && e.AnkenId == ankenId && e.Year == year && e.Month == month).SingleOrDefaultAsync();
        }
    }
    
}