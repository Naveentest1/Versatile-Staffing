using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Versatile.API.Models;

namespace Versatile.API.Controllers
{
    public class HomeController : ApiController
    {
        VersatileContext context = new VersatileContext();
        public List<User> GetAllUsers()
        {
            var x = context.Users.ToList();
            return x;
        }

        public string Index()
        {
            return "Home Page";
        }
    }
}
