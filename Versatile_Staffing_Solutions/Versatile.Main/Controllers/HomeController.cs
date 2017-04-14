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
            List<Menu> menu = new List<Menu>();
            menu.Add(new Menu() { MenuName = "Home", MenuURL = "" });
            menu.Add(new Menu() { MenuName = "Services", MenuURL = "" });
            menu.Add(new Menu() { MenuName = "Careers", MenuURL = "" });
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
    }
    public class Menu
    {
        public string MenuName { get; set; }
        public string MenuURL { get; set; }
    }
}