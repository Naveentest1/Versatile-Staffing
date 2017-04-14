using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Learn_MVC_in_7_days.ViewModels
{
    public class EmployeeViewModel
    {
        public string EmployeeName { get; set; }
        public string Salary { get; set; }
        public string SalaryColor { get; set; }
        public string UserName { get; set; }
    }
    public class EmployeeListViewModel : BaseViewModel
    {
        public List<EmployeeViewModel> Employees { get; set; }
    }
    public class CreateEmployeeViewModel : BaseViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Salary { get; set; }
    }
    public class FooterViewModel
    {
        public string CompanyName { get; set; }
        public string Year { get; set; }
    }
    public class BaseViewModel
    {
        public string UserName { get; set; }
        public FooterViewModel FooterData { get; set; }//New Property
    }
    public class FileUploadViewModel : BaseViewModel
    {
        public HttpPostedFileBase fileUpload { get; set; }
    }
}