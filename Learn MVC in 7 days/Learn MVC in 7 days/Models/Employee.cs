using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Learn_MVC_in_7_days.Models
{
    public class FirstNameValidation : ValidationAttribute /// Custom validations just like Data Annotations
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null) // Checking for Empty Value
            {
                return new ValidationResult("Please Provide First Name");
            }
            else
            {
                if (value.ToString().Contains("@"))
                {
                    return new ValidationResult("First Name should Not contain @");
                }
            }
            return ValidationResult.Success;
        }
    }
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        [FirstNameValidation]
        [Required(ErrorMessage = "Enter First Name")]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Salary { get; set; }
    }
}