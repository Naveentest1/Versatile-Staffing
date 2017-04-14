using Learn_MVC_in_7_days.DataAccessLayer;
using Learn_MVC_in_7_days.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Learn_MVC_in_7_days.Controllers
{
    
    public class AuthenticationController : Controller
    {
        // GET: Authentication
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DoLogin(UserDetails u)
        {
            if (ModelState.IsValid)
            {
                SalesERPDAL bal = new SalesERPDAL();
                //New Code Start
                UserStatus status = bal.GetUserValidity(u);
                bool IsAdmin = false;
                if (status == UserStatus.AuthenticatedAdmin)
                {
                    IsAdmin = true;
                }
                else if (status == UserStatus.AuthentucatedUser)
                {
                    IsAdmin = false;
                }
                else
                {
                    ModelState.AddModelError("CredentialError", "Invalid Username or Password");
                    return View("Login");
                }
                FormsAuthentication.SetAuthCookie(u.UserName, false);// Authentication done from the forms side.
                Session["IsAdmin"] = IsAdmin;
                return RedirectToAction("getlistview", "Day3");
            }
            else
            {
                return View("Login");
            }

        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();//It will just clear the auth cookie
            return RedirectToAction("Login");
        }
    }
}