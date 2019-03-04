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
    public class CustomerController : ControllerBase
    {
        private readonly KeisokuDbContext _keisokuDbContext;

        public CustomerController(KeisokuDbContext context)
        {
            _keisokuDbContext = context;
        }

        /// <summary>
        /// 全ての顧客情報を取得する
        /// </summary>
        /// 
        /// <returns>顧客情報リスト</returns>
        [HttpGet]
        public async Task<IEnumerable<CustomerModel>> GetAll()
        {
            return await _keisokuDbContext.Customers.OrderBy(x => x.CustomerName).ToArrayAsync();
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

            var customer = await _keisokuDbContext.Customers.SingleOrDefaultAsync(x => x.CustomerId == id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        /// <summary>
        /// 顧客情報を追加する
        /// </summary>
        /// 
        /// <param name="customerModel">顧客情報</param>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CustomerModel customerModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _keisokuDbContext.Add(customerModel);
            
            await _keisokuDbContext.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = customerModel.CustomerId }, customerModel);
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

            var customer = await _keisokuDbContext.Customers.SingleOrDefaultAsync(x => x.CustomerId == id);
            if (customer == null)
            {
                return NotFound();
            }

            _keisokuDbContext.Customers.Remove(customer);
            await _keisokuDbContext.SaveChangesAsync();

            return Ok(customer);
        }
    }
}