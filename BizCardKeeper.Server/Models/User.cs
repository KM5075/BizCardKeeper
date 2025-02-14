using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BizCardKeeper.Server.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string? GithubId { get; set; }

        public string? QiitaId { get; set; }

        public string? TwitterId { get; set; }
    }
}