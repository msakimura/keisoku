using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KengenController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KengenController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 全ての権限情報を取得する
        /// </summary>
        /// 
        /// <returns>権限情報リスト</returns>
        [HttpGet]
        public async Task<IEnumerable<KengenModel>> GetAll()
        {
            return await _context.Kengens.OrderBy(x => x.KengenId).ToArrayAsync();
        }
    }
}