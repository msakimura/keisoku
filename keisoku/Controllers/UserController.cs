using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public UserController(UserManager<IdentityUser> userManager,
                                SignInManager<IdentityUser> signInManager,
                                ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        /// <summary>
        /// 全てのユーザ情報を取得する
        /// </summary>
        /// 
        /// <returns>ユーザ情報リスト</returns>
        [HttpGet]
        public async Task<IEnumerable<UserModel>> GetAll()
        {
            return await _context.CustomersUsers.ToArrayAsync();
        }

        /// <summary>
        /// 顧客ID、ユーザIDに一致するユーザ情報を取得する
        /// </summary>
        /// 
        /// <param name="customerId">顧客ID</param>
        /// <param name="userId">ユーザID</param>
        /// <returns>ユーザ情報リスト</returns>
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

            return Ok(user);
        }

        /// <summary>
        /// ユーザ情報を追加する
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                IDictionary<string, object> value = new Dictionary<string, object>();
                value["Succeeded"] = false;

                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<UserModel>(body);

                // Identity作成
                var user = new IdentityUser
                {
                    UserName = deserialized.LoginId
                };
                var result = await _userManager.CreateAsync(user, deserialized.Password);

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

                value["Succeeded"] = true;
                value["Data"] = ((ApplicationDbContext)model.Context).CustomersUsers.Last();

                return new ObjectResult(value);
            }
        }
        
    }
}