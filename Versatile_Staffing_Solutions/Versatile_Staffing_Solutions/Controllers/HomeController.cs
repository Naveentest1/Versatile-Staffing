using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Versatile_Staffing_Solutions.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            List<Menu> menu = new List<Menu>();
            menu.Add(new Menu() { MenuName = "Home", MenuURL = "" });
            menu.Add(new Menu() { MenuName = "Services", MenuURL = "" });
            menu.Add(new Menu() { MenuName = "Contact", MenuURL = "" });
            menu.Add(new Menu() { MenuName = "Contact", MenuURL = "" });
            return View(menu);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

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
        public ActionResult consumerlending()
        {
            return View();
        }

        public ActionResult manufacturing()
        {
            return View();
        }

        public ActionResult retail()
        {
            return View();
        }

        public ActionResult servicesStaffing()
        {
            return View();
        }

        public ActionResult consultancy()
        {
            return View();
        }

        public ActionResult mechanical()
        {
            return View();
        }
    }
    
    public class Menu
    {
        public string MenuName { get; set; }
        public string MenuURL { get; set; }
    }
}