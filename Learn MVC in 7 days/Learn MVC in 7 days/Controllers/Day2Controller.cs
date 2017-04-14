using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Learn_MVC_in_7_days.Models;
using Learn_MVC_in_7_days.ViewModels;

namespace Learn_MVC_in_7_days.Controllers
{
    public class Day2Controller : Controller
    {
        // GET: Day2
        /// <summary>
        /// usage of Viewdata
        /// </summary>
        /// <returns></returns>
        public ActionResult GetView()
        {
            Employee emp = new Employee();
            emp.FirstName = "Sukesh";
            emp.LastName = "Marla";
            emp.Salary = 20000;
            ViewData["Employee"] = emp;
            ViewBag.Employee = emp;
            return View("MyView", emp);
        }
        public List<Employee> GetEmployees()
        {
            List<Employee> employees = new List<Employee>();
            Employee emp = new Employee();
            emp.FirstName = "johnson";
            emp.LastName = " fernandes";
            emp.Salary = 14000;
            employees.Add(emp);
            Employee emp1 = new Employee();
            emp1.FirstName = "johnson";
            emp1.LastName = " fernandes";
            emp1.Salary = 18000;
            employees.Add(emp1);
            return employees;
        }

        /// <summary>
        /// gets list from view model
        /// </summary>
        /// <returns></returns>
        public ActionResult GetListView()
        {
            EmployeeListViewModel employeeListViewModel = new EmployeeListViewModel();
            List<Employee> employees = GetEmployees();

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
            //employeeListViewModel.UserName = "Admin";
            return View("GetListView", employeeListViewModel);
        }
    }
}