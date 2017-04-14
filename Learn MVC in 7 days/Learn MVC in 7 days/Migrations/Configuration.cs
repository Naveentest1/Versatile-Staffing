namespace Learn_MVC_in_7_days.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Learn_MVC_in_7_days.DataAccessLayer.SalesERPDAL>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            ContextKey = "Learn_MVC_in_7_days.DataAccessLayer.SalesERPDAL";
        }

        protected override void Seed(Learn_MVC_in_7_days.DataAccessLayer.SalesERPDAL context)
        {
           var x=  context.Employees;
        }
    }
}
