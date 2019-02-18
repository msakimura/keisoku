using keisoku.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
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
        private readonly UserManager<IdentityUser> _userManager;
        private IConfiguration _config;

        public LoginController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]UserModel login)
        {
            IActionResult response = Unauthorized();
            var user = await AuthenticateUser(login);

            if (user != null)
            {

                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }


        public async Task<object> Register(UserModel login)
        {
            IActionResult response = Unauthorized();
            var user = new IdentityUser
            {
                UserName = login.UserName,
                Email = login.Email,
                EmailConfirmed = true
            };
            var result = await _userManager.CreateAsync(user, login.Email);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                var tokenString = GenerateJSONWebToken(login);
                response = Ok(new { token = tokenString });
                return response;
            }

            throw new ApplicationException("UNKNOWN_ERROR");
        }

        private string GenerateJSONWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                 new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                 new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
                 new Claim("DateOfJoing", userInfo.DateOfJoing.ToString("yyyy-MM-dd")),
                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                 };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                                                _config["Jwt:Issuer"],
                                                claims,
                                                expires: DateTime.Now.AddMinutes(120),
                                                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<UserModel> AuthenticateUser(UserModel login)
        {
            UserModel user = null;

            var result = await _signInManager.PasswordSignInAsync(login.LoginId, login.Password, false, false);

            //Validate the User Credentials 
            //Demo Purpose, I have Passed HardCoded User Information 
            if (result.Succeeded)
            {
                user = new UserModel { UserName = "JigneshTrivedi", Email = "Test1.btest@gmail.com" };
            }
            return user;
        }
    }
}