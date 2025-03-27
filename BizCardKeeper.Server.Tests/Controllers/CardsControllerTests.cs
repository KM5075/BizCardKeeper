using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.WebSockets;
using System.Threading.Tasks;
using BizCardKeeper.Server.Controllers;
using BizCardKeeper.Server.Data;
using BizCardKeeper.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BizCardKeeper.Server.Tests.Controllers;

[TestClass]
public class CardsControllerTests
{
    private static BizCardKeeperDbContext _context;

    [ClassInitialize]
    public static void ClassInitialize(TestContext testContext)
    {
        _context = TestDatabaseInitializer.CreateContext();
    }

    [TestMethod]
    public void GetAllUsers_ResponseCodeTest()
    {
        // Arrange
        var controller = new CardsController(_context);

        // Act
        var result = controller.GetAllUsers();
        var statusCode = ApiTestHelper.GetStatusCode(result);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.OK, statusCode);
    }

    [TestMethod]
    public void GetAllUsers_CountTest()
    {
        // Arrange
        var controller = new CardsController(_context);

        // Act
        var result = controller.GetAllUsers();
        var actual = result.Value as IEnumerable<User>;

        // Assert
        Assert.IsNotNull(result);
        Assert.IsNotNull(actual);
        Assert.AreEqual(_context.Users.Count(), actual.Count());
    }

    [TestMethod]
    public void GetAllUsers_ContentsTest()
    {
        // Arrange
        var controller = new CardsController(_context);

        // Act
        var result = controller.GetAllUsers();
        var actual = result.Value as IEnumerable<User>;

        // Assert
        Assert.IsNotNull(result);
        Assert.IsNotNull(actual);
        for (int i = 0; i < _context.Users.Count(); i++)
        {
            Assert.AreEqual(_context.Users.ToList()[i].UserName, actual.ToList()[i].UserName);
            Assert.AreEqual(_context.Users.ToList()[i].Description, actual.ToList()[i].Description);
            Assert.AreEqual(_context.Users.ToList()[i].GithubId, actual.ToList()[i].GithubId);
            Assert.AreEqual(_context.Users.ToList()[i].QiitaId, actual.ToList()[i].QiitaId);
            Assert.AreEqual(_context.Users.ToList()[i].TwitterId, actual.ToList()[i].TwitterId);
            Assert.AreEqual(
                _context.Users.ToList()[i].Skills.Count,
                actual.ToList()[i].Skills.Count
            );
            for (int j = 0; j < _context.Users.ToList()[i].Skills.Count; j++)
            {
                Assert.AreEqual(
                    _context.Users.ToList()[i].Skills[j].Name,
                    actual.ToList()[i].Skills[j].Name
                );
            }
        }
    }

    [TestMethod]
    public void Get_TargetUserTest()
    {
        // Arrange
        var controller = new CardsController(_context);
        var targetUser = _context.Users.Include(o => o.Skills).First();

        // Act
        var result = controller.Get(targetUser.Id);
        var actual = result.Value as User;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.OK, ApiTestHelper.GetStatusCode(result));
        Assert.IsNotNull(actual);
        Assert.AreEqual(targetUser.UserName, actual.UserName);
        Assert.AreEqual(targetUser.Description, actual.Description);
        Assert.AreEqual(targetUser.GithubId, actual.GithubId);
        Assert.AreEqual(targetUser.QiitaId, actual.QiitaId);
        Assert.AreEqual(targetUser.TwitterId, actual.TwitterId);
        Assert.AreEqual(targetUser.Skills.Count, actual.Skills.Count);
        for (int i = 0; i < targetUser.Skills.Count; i++)
        {
            Assert.AreEqual(targetUser.Skills[i].Name, actual.Skills[i].Name);
        }
    }

    [TestMethod]
    public void Get_NoDataTest()
    {
        // Arrange
        var controller = new CardsController(_context);

        // Act
        var result = controller.Get(0);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.NotFound, ApiTestHelper.GetStatusCode(result));
    }

    [TestMethod]
    public async Task Post_StatusCodeTest()
    {
        // Arrange
        _context.Database.BeginTransaction();
        var controller = new CardsController(_context);
        var newUser = new User
        {
            UserName = "user4",
            Description = "user4 description",
            GithubId = "user4_github",
            QiitaId = "user4_qiita",
            TwitterId = "user4_twitter",
        };

        newUser.Skills.Add(new Skill { Name = "skill10" });
        newUser.Skills.Add(new Skill { Name = "skill11" });

        Assert.AreEqual(0, _context.Users.Count(o => o.UserName == "user4"));

        // Act
        var result = await controller.Post(newUser);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.Created, ApiTestHelper.GetStatusCode(result));
        _context.Database.RollbackTransaction();
    }

    [TestMethod]
    public async Task Post_ResponseDataTest()
    {
        // Arrange
        _context.Database.BeginTransaction();
        var controller = new CardsController(_context);
        var newUser = new User
        {
            UserName = "user4",
            Description = "user4 description",
            GithubId = "user4_github",
            QiitaId = "user4_qiita",
            TwitterId = "user4_twitter",
        };

        newUser.Skills.Add(new Skill { Name = "skill10" });
        newUser.Skills.Add(new Skill { Name = "skill11" });

        Assert.AreEqual(0, _context.Users.Count(o => o.UserName == "user4"));

        // Act
        var result = await controller.Post(newUser);
        var actual = (result.Result as Microsoft.AspNetCore.Mvc.CreatedAtActionResult).Value as User;

        // Assert
        Assert.IsNotNull(result);
        Assert.IsNotNull(actual);
        Assert.AreEqual(newUser.UserName, actual.UserName);
        Assert.AreEqual(newUser.Description, actual.Description);
        Assert.AreEqual(newUser.GithubId, actual.GithubId);
        Assert.AreEqual(newUser.QiitaId, actual.QiitaId);
        Assert.AreEqual(newUser.TwitterId, actual.TwitterId);
        Assert.AreEqual(newUser.Skills.Count, actual.Skills.Count);
        for (int i = 0; i < newUser.Skills.Count; i++)
        {
            Assert.AreEqual(newUser.Skills[i].Name, actual.Skills[i].Name);
        }
        _context.Database.RollbackTransaction();
    }

    [TestMethod]
    public async Task Post_AddUserTest()
    {
        // Arrange
        _context.Database.BeginTransaction();
        var controller = new CardsController(_context);
        var newUser = new User
        {
            UserName = "user4",
            Description = "user4 description",
            GithubId = "user4_github",
            QiitaId = "user4_qiita",
            TwitterId = "user4_twitter",
        };

        newUser.Skills.Add(new Skill { Name = "skill10" });
        newUser.Skills.Add(new Skill { Name = "skill11" });

        Assert.AreEqual(0, _context.Users.Count(o => o.UserName == "user4"));

        // Act
        await controller.Post(newUser);
        var dbData = _context.Users.Include(o => o.Skills).First(o => o.UserName == "user4");

        // Assert
        Assert.IsNotNull(dbData);
        Assert.AreEqual(newUser.UserName, dbData.UserName);
        Assert.AreEqual(newUser.Description, dbData.Description);
        Assert.AreEqual(newUser.GithubId, dbData.GithubId);
        Assert.AreEqual(newUser.QiitaId, dbData.QiitaId);
        Assert.AreEqual(newUser.TwitterId, dbData.TwitterId);
        Assert.AreEqual(newUser.Skills.Count, dbData.Skills.Count);
        for (int i = 0; i < newUser.Skills.Count; i++)
        {
            Assert.AreEqual(newUser.Skills[i].Name, dbData.Skills[i].Name);
        }
        _context.Database.RollbackTransaction();
    }
}

