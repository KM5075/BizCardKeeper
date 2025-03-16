using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BizCardKeeper.Server.Models;

/// <summary>
/// Represents a skill that can be associated with users.
/// </summary>
public class Skill
{
    /// <summary>
    /// Gets or sets the unique identifier for the skill.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the name of the skill.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets the list of users associated with this skill.
    /// </summary>
    [JsonIgnore]
    public List<User> Users { get; } = [];
}