using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace BizCardKeeper.Server.Tests;
internal class ApiTestHelper
{
    /// <summary>
    /// Get the status code from an ActionResult
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="actionResult"></param>
    /// <returns></returns>
    internal static int? GetStatusCode<T>(ActionResult<T?> actionResult)
    {
        IConvertToActionResult convertToActionResult = actionResult; // ActionResult implicit implements IConvertToActionResult
        var actionResultWithStatusCode = convertToActionResult.Convert() as IStatusCodeActionResult;
        return actionResultWithStatusCode?.StatusCode;
    }

}