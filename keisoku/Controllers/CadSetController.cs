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
    public class CadSetController : ControllerBase
    {
        private ApplicationDbContext _context;

        public CadSetController(ApplicationDbContext context)
        {
            _context = context;
        }


        ///// <summary>
        ///// 顧客ID、案件IDに一致するCAD設定情報を取得する
        ///// </summary>
        ///// 
        ///// <param name="customerId">顧客ID</param>
        ///// <param name="ankenId">案件ID</param>
        ///// 
        ///// <returns>CAD設定情報</returns>
        ///// 
        //[HttpGet("{customerId}/{ankenId}")]
        //public async Task<IActionResult> Get([FromRoute] int customerId, int ankenId)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }


        //    var cadSets = _context.CadSets
        //        .Where(x => x.CustomerId == customerId && x.AnkenId == ankenId);

        //    if (!cadSets.Any())
        //    {
        //        return NotFound();
        //    }


        //    return Ok(await cadSets.SingleOrDefaultAsync());
        //}


        ///// <summary>
        ///// CAD設定情報を追加する
        ///// </summary>
        ///// 
        ///// <returns>追加したCAD設定情報</returns>
        ///// 
        //[HttpPost]
        //public async Task<IActionResult> Post()
        //{
        //    using (var reader = new StreamReader(Request.Body))
        //    {
        //        // JSON ⇒ Modelに変換
        //        var body = reader.ReadToEnd();

        //        var deserialized = JsonConvert.DeserializeObject<CadSetModel>(body);


        //        // 出力設定情報追加
        //        deserialized.CreatedAt = DateTime.Now;
        //        deserialized.UpdatedAt = DateTime.Now;

        //        var cadSet = await _context.CadSets.SingleOrDefaultAsync(
        //            x => x.CustomerId == deserialized.CustomerId && x.AnkenId == deserialized.AnkenId);
        //        if (cadSet != null)
        //        {
        //            _context.CadSets.Remove(cadSet);

        //        }

        //        var model = _context.CadSets.Add(deserialized);

        //        await _context.SaveChangesAsync();

        //        var addedCadSet = ((ApplicationDbContext)model.Context).CadSets.Last();


        //        return Ok(addedCadSet);
        //    }
        //}
    }
}