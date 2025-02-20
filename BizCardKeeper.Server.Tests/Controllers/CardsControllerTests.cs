using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;
using BizCardKeeper.Server.Controllers;
using BizCardKeeper.Server.Data;
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
    public void GetAllUsers_CountTest()
    {
        // Arrange
        var controller = new CardsController(_context);

        // Act
        var result = controller.GetAllUsers();

        // Assert
        Assert.AreEqual(_context.Users.Count(), result.Count());
    }
}