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
        public IActionResult GetAll()
        {
            
            var query = GetAllJoin(0, 0, "");

            return Ok(query);
            
        }

        /// <summary>
        /// 顧客ID、ユーザIDに一致するユーザ情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="userId">ユーザID</param>
        /// 
        /// <returns>ユーザ情報</returns>
        /// 
        [HttpGet("{customerId}/{userId}")]
        public IActionResult Get([FromRoute] int customerId, int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var query = GetAllJoin(customerId, userId, "");

            return Ok(query);
        }

        /// <summary>
        /// ログインIDに一致するユーザ情報を取得する
        /// </summary>
        /// 
        /// <param name="loginId">ログインID</param>
        /// 
        /// <returns>ユーザ情報</returns>
        /// 
        [HttpGet("{loginId}")]
        public IActionResult Get([FromRoute] string loginId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var query = GetAllJoin(0, 0, loginId);

            return Ok(query);
            
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
        /// ユーザ情報を更新する
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

                var deserialized = JsonConvert.DeserializeObject<UserModel>(body);

                deserialized.UpdatedAt = DateTime.Now;

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
                PutKengenFuyos(deserialized);

                _context.Entry(deserialized).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!IsUserExists(deserialized.CustomerId, deserialized.UserId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                var putData = Get(deserialized.CustomerId, deserialized.UserId);

                return new ObjectResult(putData);
            }
        }
        

        /// <summary>
        /// 顧客ID、ユーザIDに一致するユーザが存在するか判定
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

        /// <summary>
        /// 顧客ID、ユーザIDに一致する権限付与リストを取得
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="userId">ユーザID</param>
        /// 
        /// <returns>権限付与リスト</returns>
        /// 
        private IQueryable<KengenFuyoModel> GetKengenFuyos(int customerId, int userId)
        {
            return _context.KengenFuyos.Where(e => e.CustomerId == customerId && e.UserId == userId );
        }

        /// <summary>
        /// ユーザ情報に関連付いている権限付与を更新する
        /// </summary>
        /// 
        /// <param name="user">ユーザ情報</param>
        /// 
        /// 
        private void PutKengenFuyos(UserModel user)
        {
            var addedKengenFuyos = GetKengenFuyos(user.CustomerId, user.UserId);

            var targetKengenFuyos = user.KengenFuyos;

            foreach (var kengenFuyo in targetKengenFuyos)
            {
                var exists = addedKengenFuyos.Any(x => x.CustomerId == kengenFuyo.CustomerId && x.UserId == kengenFuyo.UserId && x.KengenId == kengenFuyo.KengenId);

                if (!exists)
                {
                    _context.Entry(kengenFuyo).State = EntityState.Added;
                }
            }

            foreach (var addedKengenFuyo in addedKengenFuyos)
            {
                var exists = targetKengenFuyos.Any(x => x.CustomerId == addedKengenFuyo.CustomerId && x.UserId == addedKengenFuyo.UserId && x.KengenId == addedKengenFuyo.KengenId);

                if (!exists)
                {
                    _context.Entry(addedKengenFuyo).State = EntityState.Deleted;
                }
            }
        }


        /// <summary>
        /// users、customers、kengenFuyos、kengensのJOIN結果を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="userId">ユーザID</param>
        /// <param name="loginId">ログインID</param>
        /// 
        /// <returns>結果リスト</returns>
        /// 
        private IQueryable GetAllJoin(int customerId, int userId, string loginId)
        {

            DbSet<UserModel> users = _context.CustomersUsers;
            DbSet<CustomerModel> customers = _context.Customers;
            DbSet<KengenFuyoModel> kengenFuyos = _context.KengenFuyos;
            DbSet<KengenModel> kengens = _context.Kengens;


            var query = from user in users
                        join customer in customers
                        on user.CustomerId equals customer.CustomerId
                        join fuyo in kengenFuyos
                        on new { user.CustomerId, user.UserId } equals new { fuyo.CustomerId, fuyo.UserId } into fuyoJoin
                        from fuyoJ in fuyoJoin.DefaultIfEmpty()
                        join k in kengens
                        on fuyoJ.KengenId equals k.KengenId into kengenJoin
                        from kengen in kengenJoin.DefaultIfEmpty()
                        where customerId == 0 && userId == 0 && String.IsNullOrEmpty(loginId) ? true :
                                customerId != 0 && userId != 0 ? user.CustomerId == customerId && user.UserId == userId :
                                !String.IsNullOrEmpty(loginId) ? user.LoginId == loginId : false
                        group new { user, customer, kengen } by new { user.CustomerId, user.UserId } into uGroup
                        select new
                        {
                            uGroup
                        };

            return query;
        }
        
    }

}