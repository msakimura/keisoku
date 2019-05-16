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
    public class AiKaisekiController : ControllerBase
    {
        private ApplicationDbContext _context;

        public AiKaisekiController(ApplicationDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// 顧客ID、案件ID、トンネルIDに一致するAI解析情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="ankenId">案件ID</param>
        /// <param name="tunnelId">トンネルID</param>
        /// 
        /// <returns>ダウンロード情報</returns>
        /// 
        [HttpGet("{customerId}/{ankenId}/{tunnelId}")]
        public IActionResult Get([FromRoute] int customerId, int ankenId, int tunnelId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DbSet<AiKaisekiModel> aiKaisekis = _context.AiKaisekis;
            DbSet<AiKaisekiCadModel> aiKaisekiCads = _context.AiKaisekiCads;
            DbSet<AiKaisekiPdfModel> aiKaisekiPdfs = _context.AiKaisekiPdfs;


            var query = from aiKaiseki in aiKaisekis
                        join aiKaisekiCad in aiKaisekiCads
                        on aiKaiseki.AiKaisekiCadId equals aiKaisekiCad.AiKaisekiCadId
                        join aiKaisekiPdf in aiKaisekiPdfs
                        on aiKaiseki.AiKaisekiPdfId equals aiKaisekiPdf.AiKaisekiPdfId
                        where aiKaiseki.CustomerId == customerId && aiKaiseki.AnkenId == ankenId && aiKaiseki.TunnelId == tunnelId
                        select new
                        {
                            aiKaiseki,
                            aiKaisekiCad,
                            aiKaisekiPdf
                        };

            return Ok(query);

        }
    }
}