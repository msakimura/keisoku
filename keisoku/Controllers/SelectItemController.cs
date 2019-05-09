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
    public class SelectItemController : ControllerBase
    {
        private ApplicationDbContext _context;

        public SelectItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 全ての初期設定情報を取得する
        /// </summary>
        /// 
        /// <returns>初期設定情報リスト</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SelectItemModel>>> GetAllAsync()
        {

            return await _context.SelectItems.ToListAsync();

        }
    }
}