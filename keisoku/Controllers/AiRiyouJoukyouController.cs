using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        /// 顧客IDに一致する全てのAI利用状況情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// 
        /// <returns>AI利用状況リスト</returns>
        /// 
        [HttpGet("{customerId}")]
        public IActionResult Get([FromRoute] int customerId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ankens = _context.Ankens
                .Where(x => x.CustomerId == customerId)
                .GroupBy(x => x.CreatedAt.ToString("yyyyMM"));

            if (ankens.Count() == 0)
            {
                return NotFound();
            }


            return Ok(ankens);
        }

        //private async Task<IActionResult> Create()
        //{


        //}
    }
}