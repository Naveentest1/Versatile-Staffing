using Learn_MVC_in_7_days.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Learn_MVC_in_7_days.Filters
{
    public class EmployeeExceptionFilter : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext filterContext)// overridden On exception method
        {
            FileLogger logger = new FileLogger();
            logger.LogException(filterContext.Exception);
            base.OnException(filterContext);
        }
    }
}