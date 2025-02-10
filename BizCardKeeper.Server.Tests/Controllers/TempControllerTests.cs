using Microsoft.VisualStudio.TestTools.UnitTesting;
using BizCardKeeper.Server.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BizCardKeeper.Server.Data;
using Microsoft.EntityFrameworkCore;
[assembly: ClassCleanupExecution(ClassCleanupBehavior.EndOfClass)]

namespace BizCardKeeper.Server.Controllers.Tests
{
    [TestClass()]
    public class TempControllerTests
    {
        [ClassInitialize]
        public static void ClassInitialize(TestContext testContext)
        {
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
            var options = new DbContextOptionsBuilder<BizCardKeeperDbContext>()
                .UseInMemoryDatabase(databaseName: "TempControllerTests")
                .Options;
            var context = new BizCardKeeperDbContext(options);
            var controller = new TempController(context);
            var result = controller.Get();
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            Assert.AreEqual("Hello from TempController", actual.Value);
        }

        [TestMethod()]
        public void PostTest()
        {
            var options = new DbContextOptionsBuilder<BizCardKeeperDbContext>()
                .UseInMemoryDatabase(databaseName: "TempControllerTests")
                .Options;
            var context = new BizCardKeeperDbContext(options);
            var controller = new TempController(context);
            var temp = new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "Test" };
            var result = controller.Post(temp);
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            Assert.AreEqual("Temp added", actual.Value);
        }

        [TestMethod()]
        public void GetAllTest()
        {
            var options = new DbContextOptionsBuilder<BizCardKeeperDbContext>()
                .UseInMemoryDatabase(databaseName: "TempControllerTests")
                .Options;
            var context = new BizCardKeeperDbContext(options);
            var controller = new TempController(context);
            var temp = new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "Test" };
            controller.Post(temp);
            var result = controller.GetAll();
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            var actualList = actual.Value as List<BizCardKeeper.Server.Models.Temp>;
            Assert.AreEqual(1, actualList.Count);
        }
    }
}