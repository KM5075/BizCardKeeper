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
[assembly: ClassCleanupExecution(ClassCleanupBehavior.EndOfClass)]

namespace BizCardKeeper.Server.Controllers.Tests
{
    [TestClass()]
    public class TempControllerTests
    {
        private const string ConnectionString = @"Server=(localdb)\mssqllocaldb;Database=BizCardKeeper-TestDB;Trusted_Connection=True;ConnectRetryCount=0";

        private static readonly object _lock = new();
        private static bool _databaseInitialized;

        [ClassInitialize]
        public static void ClassInitialize(TestContext testContext)
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
            using var context = CreateContext();
            var controller = new TempController(context);

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
            using var context = CreateContext();
            var controller = new TempController(context);
            var temp = new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "PostTest" };

            // Act
            context.Database.BeginTransaction();
            var result = controller.Post(temp);
            context.Database.RollbackTransaction();

            // Assert
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            Assert.AreEqual("Temp added", actual.Value);
        }

        [TestMethod()]
        public void PostTest_CheckDatabase()
        {
            // Arrange
            using var context = CreateContext();
            var defaultData = context.Temp.Where(t => t.Text == "PostTest").FirstOrDefault();
            var defaultDataCount = context.Temp.Count();
            var controller = new TempController(context);
            var temp = new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "PostTest" };

            // Act
            context.Database.BeginTransaction();
            controller.Post(temp);
            var actualCount = context.Temp.Count();
            var result = context.Temp.Where(t => t.Text == "PostTest Fail").FirstOrDefault();
            context.Database.RollbackTransaction();

            // Assert
            Assert.AreEqual(defaultData, null);
            Assert.AreEqual(defaultDataCount + 1, actualCount);
            Assert.IsNotNull(result);
        }

        [TestMethod()]
        public void GetAllTest_WithNoPost()
        {
            // Arrange
            using var context = CreateContext();
            var expected = context.Temp.Count();
            var controller = new TempController(context);

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
            using var context = CreateContext();
            var expected = context.Temp.Count();
            var controller = new TempController(context);
            var temp = new BizCardKeeper.Server.Models.Temp { Id = 0, Text = "GetAllTest" };

            // Act
            context.Database.BeginTransaction();
            controller.Post(temp);
            var result = controller.GetAll();
            context.Database.RollbackTransaction();

            // Assert
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            var actualList = actual.Value as List<BizCardKeeper.Server.Models.Temp>;
            Assert.AreEqual(expected + 1, actualList.Count);
        }
    }
}