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
    private const string ConnectionString =
        @"Server=(localdb)\mssqllocaldb;Database=BizCardKeeper-TestDB;Trusted_Connection=True;ConnectRetryCount=0";
    private static readonly object _lock = new();
    private static bool _databaseInitialized;

    static TestDatabaseInitializer()
    {
        lock (_lock)
        {
            if (!_databaseInitialized)
            {
                using (var context = CreateContext())
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();

                    var skills1 = new Skill[]
                    {
                        new Skill { Name = "skill1" },
                        new Skill { Name = "skill2" },
                        new Skill { Name = "skill3" },
                    };
                    var skills2 = new Skill[]
                    {
                        new Skill { Name = "skill4" },
                        new Skill { Name = "skill5" },
                        new Skill { Name = "skill6" },
                    };
                    var skills3 = new Skill[]
                    {
                        new Skill { Name = "skill7" },
                        new Skill { Name = "skill8" },
                        new Skill { Name = "skill9" },
                    };

                    var user1 = new User
                    {
                        UserName = "user1",
                        Description = "user1 description",
                        GithubId = "user1_github",
                        QiitaId = "user1_qiita",
                        TwitterId = "user1_twitter",
                    };
                    user1.Skills.AddRange(skills1);

                    var user2 = new User
                    {
                        UserName = "user2",
                        Description = "user2 description",
                        GithubId = "user2_github",
                        QiitaId = "user2_qiita",
                        TwitterId = "user2_twitter",
                    };
                    user2.Skills.AddRange(skills2);

                    var user3 = new User
                    {
                        UserName = "user3",
                        Description = "user3 description",
                        GithubId = "user3_github",
                        QiitaId = "user3_qiita",
                        TwitterId = "user3_twitter",
                    };
                    user3.Skills.AddRange(skills3);

                    var users = new User[] { user1, user2, user3 };

                    context.Users.AddRange(users);
                    context.SaveChanges();
                }
                Console.WriteLine("Database initialized");

                _databaseInitialized = true;
            }
        }
    }

    public static BizCardKeeperDbContext CreateContext() =>
        new BizCardKeeperDbContext(
            new DbContextOptionsBuilder<BizCardKeeperDbContext>()
                .UseSqlServer(ConnectionString)
                .Options
        );
}

