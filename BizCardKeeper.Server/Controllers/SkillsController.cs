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
public class SkillsController : ControllerBase
{
    private readonly BizCardKeeperDbContext _context;
    public SkillsController(BizCardKeeperDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<List<Skill>> GetSkills()
    {
        var skills = _context.Skills.ToList();
        if (skills == null || !skills.Any())
        {
            return NotFound("No skills found.");
        }
        return skills;
    }
}