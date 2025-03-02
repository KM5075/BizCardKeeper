using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BizCardKeeper.Server.Data;
using BizCardKeeper.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        return _context.Users.Include(u => u.Skills).ToList();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public ActionResult<User> Get(int id)
    {
        var user = _context.Users.Include(u => u.Skills).FirstOrDefault(o => o.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpPost]
    public void Post([FromBody] string value) { }

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

    [HttpGet("test")]
    public ActionResult Test()
    {
        // DBにデータを追加
        var skills = new List<Skill>
        {
            new Skill { Name = "skill10" },
            new Skill { Name = "skill11" },
            new Skill { Name = "skill12" },
        };

        var user = new User
        {
            UserName = "user4",
            Description = "user4 description",
            GithubId = "user4_github",
            QiitaId = "user4_qiita",
            TwitterId = "user4_twitter",
        };
        user.Skills.AddRange(skills);

        _context.Users.Add(user);
        _context.SaveChanges();

        return Ok("Test");
    }
}

