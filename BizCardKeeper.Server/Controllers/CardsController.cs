using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BizCardKeeper.Server.Data;
using BizCardKeeper.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BizCardKeeper.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardsController : ControllerBase
{
    private readonly BizCardKeeperDbContext _context;

    public CardsController(BizCardKeeperDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<User>> GetAllUsers()
    {
        return _context.Users.ToList();
    }

    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
        throw new NotImplementedException();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        throw new NotImplementedException();
    }
}