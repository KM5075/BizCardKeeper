using Microsoft.VisualStudio.TestTools.UnitTesting;
using BizCardKeeper.Server.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BizCardKeeper.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace BizCardKeeper.Server.Controllers.Tests
{
    [TestClass()]
    public class TempControllerTests
    {
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
    }
}