using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<IdentityUser> _userManager;

        public PasswordController(UserManager<IdentityUser> userManager,
                                ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }


        /// <summary>
        /// パスワードを更新する
        /// </summary>
        /// 
        /// <returns>更新結果</returns>
        /// 
        [HttpPut]
        public async Task<IActionResult> Put()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<PasswordModel>(body);

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

                return Ok();
            }
        }
    }
}