using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BizCardKeeper.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TempController : ControllerBase
    {
        public TempController()
        {
        }

        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("Hello from TempController");
        }
    }
}