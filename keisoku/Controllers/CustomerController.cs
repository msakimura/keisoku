using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace keisoku.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : BaseController
    {

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
            return await _context.Customers.ToArrayAsync();
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

                deserialized.CreatedAt = DateTime.Now;
                deserialized.UpdatedAt = DateTime.Now;

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