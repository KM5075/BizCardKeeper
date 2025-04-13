using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BizCardKeeper.Server.Models;

/// <summary>
/// Represents a user in the system.
/// </summary>
public class User
{
    /// <summary>
    /// Gets or sets the unique identifier for the user.
    /// </summary>
    [Required]
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the username of the user.
    /// </summary>
    [Required]
    public string UserName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the description of the user.
    /// </summary>
    [Required]
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the GitHub ID of the user.
    /// </summary>
    public string? GithubId { get; set; }

    /// <summary>
    /// Gets or sets the Qiita ID of the user.
    /// </summary>
    public string? QiitaId { get; set; }

    /// <summary>
    /// Gets or sets the Twitter ID of the user.
    /// </summary>
    public string? TwitterId { get; set; }

    /// <summary>
    /// Gets or sets the list of skills associated with the user.
    /// </summary>
    public List<Skill> Skills { get; set; } = [];
}

