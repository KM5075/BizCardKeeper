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
            Assert.AreEqual(_context.Users.ToList()[i].Username, actual.ToList()[i].Username);
            Assert.AreEqual(_context.Users.ToList()[i].Description, actual.ToList()[i].Description);
            Assert.AreEqual(_context.Users.ToList()[i].GithubId, actual.ToList()[i].GithubId);
            Assert.AreEqual(_context.Users.ToList()[i].QiitaId, actual.ToList()[i].QiitaId);
            Assert.AreEqual(_context.Users.ToList()[i].TwitterId, actual.ToList()[i].TwitterId);
            Assert.AreEqual(_context.Users.ToList()[i].Skills.Count, actual.ToList()[i].Skills.Count);
            for (int j = 0; j < _context.Users.ToList()[i].Skills.Count; j++)
            {
                Assert.AreEqual(_context.Users.ToList()[i].Skills[j].Name, actual.ToList()[i].Skills[j].Name);
            }
        }
    }

}