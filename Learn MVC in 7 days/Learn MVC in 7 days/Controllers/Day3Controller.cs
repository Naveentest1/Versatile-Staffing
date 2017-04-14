using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Learn_MVC_in_7_days.DataAccessLayer;
using Learn_MVC_in_7_days.Models;
using Learn_MVC_in_7_days.ViewModels;
using Learn_MVC_in_7_days.Filters;

namespace Learn_MVC_in_7_days.Controllers
{
    
    [Authorize]
    public class Day3Controller : Controller
    {
        // GET: Day3
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetListView()

        {
            EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
            SalesERPDAL salesDal = new SalesERPDAL();
            List<Employee> employees = salesDal.Employees.ToList();
           
             
            List<EmployeeViewModel> empViewModels = new List<EmployeeViewModel>();

            foreach (Employee emp in employees)
            {
                EmployeeViewModel empViewModel = new EmployeeViewModel();
                empViewModel.EmployeeName = emp.FirstName + " " + emp.LastName;
                empViewModel.Salary = emp.Salary.ToString("C");
                if (emp.Salary > 15000)
                {
                    empViewModel.SalaryColor = "yellow";
                }
                else
                {
                    empViewModel.SalaryColor = "green";
                }
                empViewModels.Add(empViewModel);
            }
            employeeListViewModel.Employees = empViewModels;
            employeeListViewModel.UserName = User.Identity.Name;
            employeeListViewModel.FooterData = new FooterViewModel();
            employeeListViewModel.FooterData.CompanyName = "Matsugana";//Can be set to dynamic value
            employeeListViewModel.FooterData.Year = DateTime.Now.Year.ToString();
            //employeeListViewModel.UserName = "Admin";
            return View("GetEmployees", employeeListViewModel);
        }

        [HeaderFooterFilter]
        public ActionResult AddNew()
        {
            CreateEmployeeViewModel employeeListViewModel = new CreateEmployeeViewModel();
            /// These values will get set from action filters..
            employeeListViewModel.FooterData = new FooterViewModel();
            employeeListViewModel.FooterData.CompanyName = "Matsugana";//Can be set to dynamic value
            employeeListViewModel.FooterData.Year = DateTime.Now.Year.ToString();
            employeeListViewModel.UserName = User.Identity.Name; //New Line
            return View("CreateEmployee", employeeListViewModel);
        }

        public ActionResult GetAddNewLink()
        {
            if (Convert.ToBoolean(Session["IsAdmin"]))
            {
                return View("AddNewLink");
            }
            else
            {
                return new EmptyResult();
            }
        }

        public ActionResult SaveEmployee(Employee e, string BtnSubmit)
        {
            //Request.Form["FirstName"] can also be used if html control name and model property doesnt match.
            switch (BtnSubmit)
            {
                case "Save Employee":// validation using data annotation
                    if (ModelState.IsValid)
                    {
                        SalesERPDAL empBal = new SalesERPDAL();
                        empBal.SaveEmployee(e);
                        return RedirectToAction("GetListView");
                    }
                    else
                    {
                        CreateEmployeeViewModel vm = new CreateEmployeeViewModel();
                        vm.FirstName = e.FirstName;
                        vm.LastName = e.LastName;
                        vm.FooterData = new FooterViewModel();
                        vm.FooterData.CompanyName = "Matsugana";//Can be set to dynamic value
                        vm.FooterData.Year = DateTime.Now.Year.ToString();
                        vm.UserName = User.Identity.Name; //New Line
                        if (e.Salary > 0)
                        {
                            vm.Salary = e.Salary.ToString();
                        }
                        else
                        {
                            vm.Salary = ModelState["Salary"].Value.AttemptedValue;
                        }
                        return View("CreateEmployee", vm); 
                    }
                case "Cancel":
                    return RedirectToAction("GetListView");
            }
            return new EmptyResult();
        }
    }
}