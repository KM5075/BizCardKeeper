using Microsoft.VisualStudio.TestTools.UnitTesting;
using BizCardKeeper.Server.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BizCardKeeper.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using BizCardKeeper.Server.Tests;

namespace BizCardKeeper.Server.Controllers.Tests
{
    [TestClass()]
    public class TempControllerTests
    {
        private static BizCardKeeperDbContext _context;

        public TempControllerTests()
        {
        }

        [ClassInitialize]
        public static void ClassInitialize(TestContext testContext)
        {
            _context = TestDatabaseInitializer.CreateContext();
        }

        [TestInitialize]
        public void TestInitialize()
        {
        }

        [TestCleanup]
        public void TestCleanup()
        {
        }

        [ClassCleanup]
        public static void ClassCleanup()
        {

        }

        [TestMethod()]
        public void GetTest()
        {
            // Arrange
            var controller = new TempController(_context);

            // Act
            var result = controller.Get();
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;

            // Assert
            Assert.AreEqual("Hello from TempController", actual.Value);
        }

        [TestMethod()]
        public void PostTest_CheckResponse()
        {
            // Arrange
            var controller = new TempController(_context);
            var temp = new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "PostTest" };

            // Act
            _context.Database.BeginTransaction();
            var result = controller.Post(temp);
            _context.Database.RollbackTransaction();

            // Assert
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            Assert.AreEqual("Temp added", actual.Value);
        }

        [TestMethod()]
        public void PostTest_CheckDatabase()
        {
            // Arrange
            var defaultData = _context.Temp.Where(t => t.Text == "PostTest").FirstOrDefault();
            var defaultDataCount = _context.Temp.Count();
            var controller = new TempController(_context);
            var temp = new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "PostTest" };

            // Act
            _context.Database.BeginTransaction();
            controller.Post(temp);
            var actualCount = _context.Temp.Count();
            var result = _context.Temp.Where(t => t.Text == "PostTest").FirstOrDefault();
            _context.Database.RollbackTransaction();

            // Assert
            Assert.AreEqual(defaultData, null);
            Assert.AreEqual(defaultDataCount + 1, actualCount);
            Assert.IsNotNull(result);
        }

        [TestMethod()]
        public void GetAllTest_WithNoPost()
        {
            // Arrange
            var expected = _context.Temp.Count();
            var controller = new TempController(_context);

            // Act
            var result = controller.GetAll();

            // Assert
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            var actualList = actual.Value as List<BizCardKeeper.Server.Models.Temp>;
            Assert.AreEqual(expected, actualList.Count);
        }

        [TestMethod()]
        public void GetAllTest_WithPost()
        {
            // Arrange
            var expected = _context.Temp.Count();
            var controller = new TempController(_context);
            var temp = new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "GetAllTest" };

            // Act
            _context.Database.BeginTransaction();
            controller.Post(temp);
            var result = controller.GetAll();
            _context.Database.RollbackTransaction();

            // Assert
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            var actualList = actual.Value as List<BizCardKeeper.Server.Models.Temp>;
            Assert.AreEqual(expected + 1, actualList.Count);
        }
    }
}