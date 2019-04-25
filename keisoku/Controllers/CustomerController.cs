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
        public IActionResult GetAll()
        {

            DbSet<CustomerModel> customers = _context.Customers;
            DbSet<OptionFuyoModel> optionFuyos = _context.OptionFuyos;
            DbSet<OptionModel> options = _context.Options;


            var query =
                customers.Join(
                    optionFuyos,
                    customer => customer.CustomerId,
                    optionFuyo => optionFuyo.CustomerId,
                    (customer, optionFuyo) => new
                    {
                        customer.CustomerId,
                        customer.CustomerName,
                        optionFuyo.OptionId,
                    })
                    .Join(
                        options,
                        optionFuyo => optionFuyo.OptionId,
                        option => option.OptionId,
                        (optionFuyo, option) => new
                        {
                            option.OptionKubun,
                            option.OptionName
                        })
                        .OrderBy(x => x.OptionName);

            if (!query.Any())
            {
                return NotFound();
            }


            return Ok(query);
            
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
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<CustomerModel>(body);

                deserialized.CreatedAt = DateTime.Now;
                deserialized.UpdatedAt = DateTime.Now;

                var model = _context.Customers.Add(deserialized);

                var result = await _context.SaveChangesAsync();

                var customer = ((ApplicationDbContext)model.Context).Customers.Last();

                return Ok(customer);
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


        /// <summary>
        /// 顧客情報を更新する
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

                var deserialized = JsonConvert.DeserializeObject<CustomerModel>(body);

                deserialized.UpdatedAt = DateTime.Now;

                // 顧客情報更新
                _context.Entry(deserialized).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IsCustomerExists(deserialized.CustomerId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                var putData = await Get(deserialized.CustomerId);

                return new ObjectResult(putData);
            }
        }


        /// <summary>
        /// 顧客IDに一致する顧客が存在するか判定
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// 
        /// <returns>存在有無</returns>
        /// 
        private bool IsCustomerExists(int customerId)
        {
            return _context.Customers.Any(e => e.CustomerId == customerId);
        }
    }
}