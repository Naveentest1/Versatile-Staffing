using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Learn_MVC_in_7_days.Controllers
{
        // GET: Error
        public class ErrorController : Controller
        {
            // GET: Error
            public ActionResult Index()// to check 404 error given in custom errors in web.config
            {
                Exception e = new Exception("Invalid Controller or/and Action Name");
                HandleErrorInfo eInfo = new HandleErrorInfo(e, "Unknown", "Unknown");
                return View("Error", eInfo);
            }
        }
}