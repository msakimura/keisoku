using keisoku.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _config;

        public LoginController(SignInManager<IdentityUser> signInManager,
            IConfiguration config)
        {
            _signInManager = signInManager;
            _config = config;
        }

        /// <summary>
        /// リクエストのログインID、パスワードでoAuth認証する
        /// </summary>
        /// 
        /// <returns>ユーザ情報リスト</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                // JSON ⇒ Modelに変換
                var body = reader.ReadToEnd();

                var deserialized = JsonConvert.DeserializeObject<UserModel>(body);

                // oAuth認証
                IActionResult response = Unauthorized();

                var result = await _signInManager.PasswordSignInAsync(deserialized.LoginId, deserialized.Password, false, false);

                if (result.Succeeded)
                {

                    var tokenString = GenerateJSONWebToken(deserialized);
                    response = Ok(new { token = tokenString });
                }

                return response;
            }
            
        }

        /// <summary>
        /// ユーザ情報に対するアクセストークンを取得する
        /// </summary>
        /// 
        /// <param name="userInfo">ユーザ情報</param>
        /// 
        /// <returns>アクセストークン</returns>
        /// 
        private string GenerateJSONWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                 new Claim(JwtRegisteredClaimNames.Sub, userInfo.LoginId),
                 new Claim("Password", userInfo.Password),
                 new Claim("CreatedAt", userInfo.CreatedAt.ToString("yyyy-MM-dd")),
                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                 };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                                                _config["Jwt:Issuer"],
                                                claims,
                                                expires: DateTime.Now.AddMinutes(120),
                                                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
    }
}