using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BizCardKeeper.Server.Constants;

/// <summary>
/// Contains application-wide constants.
/// </summary>
public static class AppConstants
{
    /// <summary>
    /// Contains constants related to authorization roles.
    /// </summary>
    public static class Authorization
    {
        /// <summary>
        /// Represents the Admin role.
        /// </summary>
        public const string Admin = "Admin";

        /// <summary>
        /// Represents the User role.
        /// </summary>
        public const string User = "User";
    }
}
