using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BizCardKeeper.Server.Data;
using BizCardKeeper.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BizCardKeeper.Server.Controllers;
/// <summary>
/// Controller for managing skills.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
    private readonly BizCardKeeperDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="SkillsController"/> class.
    /// </summary>
    /// <param name="context">The database context for BizCardKeeper.</param>
    public SkillsController(BizCardKeeperDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retrieves a list of all skills.
    /// </summary>
    /// <returns>A list of skills or a NotFound result if no skills are available.</returns>
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