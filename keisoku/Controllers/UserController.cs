using System;
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
        /// ユーザ情報を追加する
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
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
                    return BadRequest();
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


                
                return Ok();
            }

            //var user = new IdentityUser
            //{
            //    UserName = userModel.UserName,
            //    Email = userModel.Email,
            //    EmailConfirmed = true
            //};
            //var result = await _userManager.CreateAsync(user, userModel.Password);

            //if (result.Succeeded)
            //{
            //    return Ok();
            //}

            //return BadRequest();
        }
    }
}