using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using keisoku.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private IConfiguration _config;

        public UserController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [Route("api/[controller]/register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]UserModel userModel)
        {
            var user = new IdentityUser
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                EmailConfirmed = true
            };
            var result = await _userManager.CreateAsync(user, userModel.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}