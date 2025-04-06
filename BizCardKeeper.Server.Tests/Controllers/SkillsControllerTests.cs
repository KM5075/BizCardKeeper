using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BizCardKeeper.Server.Controllers;
using BizCardKeeper.Server.Data;
using BizCardKeeper.Server.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BizCardKeeper.Server.Tests.Controllers;
[TestClass]
public class SkillsControllerTests
{
    private static BizCardKeeperDbContext _context;

    [ClassInitialize]
    public static void ClassInitialize(TestContext testContext)
    {
        _context = TestDatabaseInitializer.CreateContext();
    }
    [TestMethod]
    public void GetSkills_ResponseOK()
    {
        // Arrange
        var controller = new SkillsController(_context);

        // Act
        var result = controller.GetSkills();
        var statusCode = ApiTestHelper.GetStatusCode(result);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)System.Net.HttpStatusCode.OK, statusCode);
    }

    [TestMethod]
    public void GetSkills_ContentTest()
    {
        // Arrange
        var controller = new SkillsController(_context);

        // Act
        var result = controller.GetSkills();
        var actual = result.Value as IEnumerable<Skill>;

        // Assert
        Assert.IsNotNull(result);
        Assert.IsNotNull(actual);
        Assert.AreEqual(_context.Skills.Count(), actual.Count());

        for (int i = 0; i < actual.Count(); i++)
        {
            Assert.AreEqual(_context.Skills.ToList()[i].Id, actual.ToList()[i].Id);
            Assert.AreEqual(_context.Skills.ToList()[i].Name, actual.ToList()[i].Name);
        }
    }
}