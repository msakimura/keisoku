using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace keisoku.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 全ての顧客情報を取得する
        /// </summary>
        /// 
        /// <returns>顧客情報リスト</returns>
        [HttpGet]
        public async Task<IEnumerable<CustomerModel>> GetAll()
        {
            return await _context.Customers.OrderBy(x => x.CustomerName).ToArrayAsync();
        }

        /// <summary>
        /// 顧客IDに一致する顧客情報を取得する
        /// </summary>
        /// 
        /// <param name="id">顧客ID</param>
        /// <returns>顧客情報リスト</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Customers.SingleOrDefaultAsync(x => x.CustomerId == id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        /// <summary>
        /// 顧客情報を追加する
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<CustomerModel>(body);


                var model = _context.Customers.Add(deserialized);

                var result = await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { id = ((ApplicationDbContext)model.Context).Customers.Last().CustomerId }, deserialized);
            }
        }

        /// <summary>
        /// 顧客IDに一致する顧客情報を削除する
        /// </summary>
        /// 
        /// <param name="id">顧客ID</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Customers.SingleOrDefaultAsync(x => x.CustomerId == id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok(customer);
        }
    }
}