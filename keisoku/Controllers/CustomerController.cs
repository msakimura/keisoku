using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using keisoku.Data;
using keisoku.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace keisoku.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly KeisokuDbContext _keisokuDbContext;
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CustomerModel customerModel)
        {
            var result = await _keisokuDbContext.AddAsync(customerModel);
            
            await _keisokuDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}