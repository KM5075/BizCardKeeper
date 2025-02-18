using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BizCardKeeper.Server.Data;
using BizCardKeeper.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BizCardKeeper.Server.Tests;
public class TestDatabaseInitializer
{
    private const string ConnectionString = @"Server=(localdb)\mssqllocaldb;Database=BizCardKeeper-TestDB;Trusted_Connection=True;ConnectRetryCount=0";
    private static readonly object _lock = new();
    private static bool _databaseInitialized;

    public TestDatabaseInitializer()
    {
        lock (_lock)
        {
            if (!_databaseInitialized)
            {
                using (var context = CreateContext())
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();

                    context.Temp.Add(new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "TestData1" });
                    context.Temp.Add(new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "TestData2" });
                    context.Temp.Add(new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "TestData3" });

                    var users = new User[]
                    {
                        new User
                        {
                            Username = "user1",
                            Description = "user1 description",
                            GithubId = "user1_github",
                            QiitaId = "user1_qiita",
                            TwitterId = "user1_twitter",
                            Skills = new List<Skill>
                            {
                                new Skill { Name = "skill1" },
                                new Skill { Name = "skill2" },
                                new Skill { Name = "skill3" }
                            }
                        },
                        new User
                        {
                            Username = "user2",
                            Description = "user2 description",
                            GithubId = "user2_github",
                            QiitaId = "user2_qiita",
                            TwitterId = "user2_twitter",
                            Skills = new List<Skill>
                            {
                                new Skill { Name = "skill4" },
                                new Skill { Name = "skill5" },
                                new Skill { Name = "skill6" }
                            }
                        }
                    };
                    context.Users.AddRange(users);
                    context.SaveChanges();
                }
                Console.WriteLine("Database initialized");

                _databaseInitialized = true;
            }
        }
    }
    public static BizCardKeeperDbContext CreateContext()
        => new BizCardKeeperDbContext(
            new DbContextOptionsBuilder<BizCardKeeperDbContext>()
            .UseSqlServer(ConnectionString)
            .Options);
}