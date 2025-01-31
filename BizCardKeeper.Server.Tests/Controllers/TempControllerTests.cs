using Microsoft.VisualStudio.TestTools.UnitTesting;
using BizCardKeeper.Server.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizCardKeeper.Server.Controllers.Tests
{
    [TestClass()]
    public class TempControllerTests
    {
        [TestMethod()]
        public void GetTest()
        {
            var controller = new TempController();
            var result = controller.Get();
            var actual = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            Assert.AreEqual("Hello from TempController!!", actual.Value);
        }
    }
}