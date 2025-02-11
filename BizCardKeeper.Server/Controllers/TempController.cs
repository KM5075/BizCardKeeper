using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BizCardKeeper.Server.Data;
using BizCardKeeper.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BizCardKeeper.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TempController : ControllerBase
    {
        private readonly BizCardKeeperDbContext _context;
        public TempController(BizCardKeeperDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("Hello from TempController");
        }

        [HttpPost]
        public ActionResult<string> Post(Temp temp)
        {
            _context.Temp.Add(temp);
            _context.SaveChanges();
            return Ok("Temp added");
        }

        [HttpGet("all")]
        public ActionResult<IEnumerable<Temp>> GetAll()
        {
            return Ok(_context.Temp.ToList());
        }
    }
}