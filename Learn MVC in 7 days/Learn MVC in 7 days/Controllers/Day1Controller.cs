using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Learn_MVC_in_7_days.Controllers
{
    public class Customer
    {
        public string CustomerName { get; set; }
        public string Address { get; set; }
    }

    public class Day1Controller : Controller
    {
        // GET: Test
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// It returns just a string result to UI
        /// </summary>
        /// <returns></returns>
        public string GetString()
        {
            return "MVC project";
        }
        /// <summary>
        /// It returns namespace.class name
        /// </summary>
        /// <returns></returns>
        public string GetCustomer()
        {
            Customer c = new Customer();
            c.CustomerName = "Customer 1";
            c.Address = "Address1";
            return c.ToString();
        }

        /// <summary>
        /// to get the value inside the class.Currently It is not getting overridden.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return "Customer 1" + "|" + "Address1";
        }

        /// <summary>
        /// This method cannot be called from browser
        /// </summary>
        /// <returns></returns>
        [NonAction]
        public string SimpleMethod()
        {
            return "Hi, I am not action method";
        }

        /// <summary>
        /// method which returns views or content
        /// </summary>
        /// <returns></returns>
        public ActionResult GetView()
        {
            if(false)
            {
                if (false)
                {
                    return View("MyView");
                }
                else
                {
                    return View("YourView");
                }
            }
            else
            {
                return Content("Hi Welcome");
            }
            
        }
    }
}