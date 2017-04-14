using System.Data.Entity;
using Learn_MVC_in_7_days.Models;
using System.Collections.Generic;

namespace Learn_MVC_in_7_days.DataAccessLayer
{
    public class SalesERPDAL : DbContext
    {
        /// <summary>
        /// to have a new connection string
        /// </summary>
        //public SalesERPDAL() : base("NewName")
        //{
        //}
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("TblEmployee");
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Employee> Employees { get; set; }

        public void UploadEmployees(List<Employee> employees)
        {
            SalesERPDAL salesDal = new SalesERPDAL();
            salesDal.Employees.AddRange(employees);
            salesDal.SaveChanges();
        }

        public Employee SaveEmployee(Employee e)
        {
            SalesERPDAL salesDal = new SalesERPDAL();
            salesDal.Employees.Add(e);
            salesDal.SaveChanges();
            return e;
        }

        public bool IsValidUser(UserDetails u)
        {
            if (u.UserName == "Admin" && u.Password == "Admin")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// role based authority given now.
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        public UserStatus GetUserValidity(UserDetails u)
        {
            if (u.UserName == "Admin" && u.Password == "Admin")
            {
                return UserStatus.AuthenticatedAdmin;
            }
            else if (u.UserName == "Naveen" && u.Password == "Naveen")
            {
                return UserStatus.AuthentucatedUser;
            }
            else
            {
                return UserStatus.NonAuthenticatedUser;
            }
        }
    }
}