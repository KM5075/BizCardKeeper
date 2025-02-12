using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BizCardKeeper.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BizCardKeeper.Server.Data;
public class BizCardKeeperDbContext : DbContext
{
    public BizCardKeeperDbContext(DbContextOptions<BizCardKeeperDbContext> options) : base(options)
    {
    }

    public DbSet<Temp> Temp { get; set; }

    public DbSet<User> Users { get; set; }
}