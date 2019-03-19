using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Identity;
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
    public class UserController : BaseController
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(UserManager<IdentityUser> userManager,
                                ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        /// <summary>
        /// 全てのユーザ情報を取得する
        /// </summary>
        /// 
        /// <returns>ユーザ情報リスト</returns>
        /// 
        [HttpGet]
        public async Task<IEnumerable<UserModel>> GetAll()
        {
            var users = await _context.CustomersUsers.ToArrayAsync();

            foreach(var user in users)
            {
                await SetCustomer(user);

                await SetKengenFuyos(user);
            }

            return users;
        }

        /// <summary>
        /// 顧客ID、ユーザIDに一致するユーザ情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="userId">ユーザID</param>
        /// 
        /// <returns>ユーザ情報リスト</returns>
        /// 
        [HttpGet("{customerId}/{userId}")]
        public async Task<IActionResult> Get([FromRoute] int customerId, int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.CustomersUsers.SingleOrDefaultAsync(x => x.CustomerId == customerId && x.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }

            await SetCustomer(user);

            await SetKengenFuyos(user);

            return Ok(user);
        }

        /// <summary>
        /// ユーザ情報を追加する
        /// </summary>
        /// 
        /// <returns>追加したユーザ情報</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                IDictionary<string, object> value = new Dictionary<string, object>
                {
                    ["Succeeded"] = false
                };

                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<UserModel>(body);

                // Identity追加
                var iUser = new IdentityUser
                {
                    UserName = deserialized.LoginId
                };
                var result = await _userManager.CreateAsync(iUser, deserialized.Password);

                if (!result.Succeeded)
                {
                    value["ErrorMessage"] = result.Errors;
                    return new ObjectResult(value);
                }

                // ユーザ情報追加
                deserialized.CreatedAt = DateTime.Now;
                deserialized.UpdatedAt = DateTime.Now;

                foreach(var kengenfuyo in deserialized.KengenFuyos)
                {
                    kengenfuyo.CreatedAt = DateTime.Now;
                    kengenfuyo.UpdatedAt = DateTime.Now;
                }

                var model = _context.CustomersUsers.Add(deserialized);

                await _context.SaveChangesAsync();

                var user = ((ApplicationDbContext)model.Context).CustomersUsers.Last();

                await SetCustomer(user);

                await SetKengenFuyos(user);

                value["Succeeded"] = true;
                value["Data"] = user;

                return new ObjectResult(value);
            }
        }

        /// <summary>
        /// 顧客ID、ユーザIDに一致するユーザ情報を削除する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="userId">ユーザID</param>
        /// 
        /// <returns>削除したユーザ情報</returns>
        /// 
        [HttpDelete("{customerId}/{userId}")]
        public async Task<IActionResult> Delete([FromRoute] int customerId, int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            
            var user = await _context.CustomersUsers.SingleOrDefaultAsync(x => x.CustomerId == customerId && x.UserId == userId);
            if (user == null)
            {
                return NotFound();
            }
            
            var iUser = _userManager.Users.FirstOrDefault(x => x.UserName == user.LoginId);
            if (iUser == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(iUser);
            if (!result.Succeeded)
            {
                return NotFound();
            }
            
            _context.CustomersUsers.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        /// <summary>
        /// 顧客ID、ユーザIDに一致するユーザ情報を更新する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="userId">ユーザID</param>
        /// 
        /// <returns>削除したユーザ情報</returns>
        /// 
        [HttpPut("{customerId}/{userId}")]
        public async Task<IActionResult> Put([FromRoute] int customerId, int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var reader = new StreamReader(Request.Body))
            {
                IDictionary<string, object> value = new Dictionary<string, object>
                {
                    ["Succeeded"] = false
                };

                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<UserModel>(body);

                if (customerId != deserialized.CustomerId || userId != deserialized.UserId)
                {
                    return BadRequest();
                }

                // Identity更新
                var iUser = _userManager.Users.FirstOrDefault(x => x.UserName == deserialized.LoginId);
                if (iUser == null)
                {
                    return NotFound();
                }

                var removeResult = await _userManager.RemovePasswordAsync(iUser);
                if (!removeResult.Succeeded)
                {
                    return NotFound();
                }

                var addResult = await _userManager.AddPasswordAsync(iUser, deserialized.Password);
                if (!addResult.Succeeded)
                {
                    return NotFound();
                }

                // ユーザ情報更新
                _context.Entry(deserialized).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IsUserExists(customerId, userId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }
        }

        /// <summary>
        /// 顧客ID、ユーザIDに一致するユーザ情報が存在するか判定
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="userId">ユーザID</param>
        /// 
        /// <returns>存在有無</returns>
        /// 
        private bool IsUserExists(int customerId, int userId)
        {
            return _context.CustomersUsers.Any(e => e.CustomerId == customerId && e.UserId == userId);
        }
    }
}