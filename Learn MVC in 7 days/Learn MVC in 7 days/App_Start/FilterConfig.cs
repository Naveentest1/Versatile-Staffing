using Learn_MVC_in_7_days.Filters;
using System.Web;
using System.Web.Mvc;

namespace Learn_MVC_in_7_days
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            //filters.Add(new HandleErrorAttribute());//just error
            filters.Add(new EmployeeExceptionFilter());// error page + log
        }
    }
}
