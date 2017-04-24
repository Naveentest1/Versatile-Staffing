using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Privacy()
        {
            return View();
        }

        public ActionResult Disclaimer()
        {
            return View();
        }

        public ActionResult ContactUs()
        {
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Awards()
        {
            return View();
        }
        public ActionResult Testimonials()
        {
            return View();
        }
        public ActionResult NewsEvents()
        {
            return View();
        }

        public ActionResult ManagementTeam()
        {
            return View();
        }
        public ActionResult Aboutus()
        {
            return View();
        }

        public ActionResult Careers()
        {
            return View();
        }

        public ActionResult mottoStaffing()
        {
            return View();
        }

        public ActionResult mottoSoftware()
        {
            return View();
        }

        public ActionResult servicesTesting()
        {
            return View();
        }

        public ActionResult servicesDevelopment()
        {
            return View();
        }
    }
}