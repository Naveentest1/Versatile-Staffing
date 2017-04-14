using Learn_MVC_in_7_days.DataAccessLayer;
using Learn_MVC_in_7_days.Filters;
using Learn_MVC_in_7_days.Models;
using Learn_MVC_in_7_days.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Learn_MVC_in_7_days.Controllers
{
    public class BulkUploadController : AsyncController
    {
        [HeaderFooterFilter]
        public ActionResult Index()
        {
            return View(new FileUploadViewModel());
        }
        
        public async Task<ActionResult> Upload(FileUploadViewModel model)
        {
            int t1 = Thread.CurrentThread.ManagedThreadId;
            List<Employee> employees = await Task.Factory.StartNew<List<Employee>>
                (() => GetEmployees(model));
            int t2 = Thread.CurrentThread.ManagedThreadId;
            SalesERPDAL bal = new SalesERPDAL();
            bal.UploadEmployees(employees);
            return RedirectToAction("Getlistview", "Day3");
        }

        private List<Employee> GetEmployees(FileUploadViewModel model)
        {
            List<Employee> employees = new List<Employee>();
            StreamReader csvreader = new StreamReader(model.fileUpload.InputStream);
            csvreader.ReadLine(); // Assuming first line is header
            while (!csvreader.EndOfStream)
            {
                var line = csvreader.ReadLine();
                var values = line.Split(',');//Values are comma separated
                Employee e = new Employee();
                e.FirstName = values[0];
                e.LastName = values[1];
                e.Salary = int.Parse(values[2]);
                employees.Add(e);
            }
            return employees;
        }
    }
}