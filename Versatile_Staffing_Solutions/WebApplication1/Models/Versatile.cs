namespace Versatile.API.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class VersatileContext : DbContext
    {
        public VersatileContext()
            : base("name=Versatile")
        {
        }

        public virtual DbSet<CandidateDetail> CandidateDetails { get; set; }
        public virtual DbSet<CandidateDocument> CandidateDocuments { get; set; }
        public virtual DbSet<CandidatePreviousEmploymentDetail> CandidatePreviousEmploymentDetails { get; set; }
        public virtual DbSet<ClientCompanyDetail> ClientCompanyDetails { get; set; }
        public virtual DbSet<DocumentType> DocumentTypes { get; set; }
        public virtual DbSet<EmployeeDetail> EmployeeDetails { get; set; }
        public virtual DbSet<EmployeeDocument> EmployeeDocuments { get; set; }
        public virtual DbSet<EmployeeEmploymentDetail> EmployeeEmploymentDetails { get; set; }
        public virtual DbSet<MyCompany> MyCompanies { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<UserRolePermission> UserRolePermissions { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.CandidateName)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.ResumeTitle)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.CurrentDesignation)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.CurrentCompany)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.OverallExperience)
                .HasPrecision(18, 0);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.RelevantExperience)
                .HasPrecision(18, 0);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.CurrentSalaryPerMonth)
                .HasPrecision(18, 0);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.ExpectedSalaryPerMonth)
                .HasPrecision(18, 0);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.CurrentLocation)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.PreferredLocation)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.KeySkills)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.Qualification)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.Address)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.WorkedOn)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.PinCode)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.Gender)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.MaritalStatus)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDetail>()
                .Property(e => e.Caste)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDocument>()
                .Property(e => e.DocumentDetails)
                .IsUnicode(false);

            modelBuilder.Entity<CandidateDocument>()
                .Property(e => e.DocumentByteArray)
                .IsUnicode(false);

            modelBuilder.Entity<CandidatePreviousEmploymentDetail>()
                .Property(e => e.CompanyName)
                .IsUnicode(false);

            modelBuilder.Entity<CandidatePreviousEmploymentDetail>()
                .Property(e => e.WorkedOn)
                .IsUnicode(false);

            modelBuilder.Entity<ClientCompanyDetail>()
                .Property(e => e.ClientCompanyName)
                .IsUnicode(false);

            modelBuilder.Entity<ClientCompanyDetail>()
                .Property(e => e.RecordStatus)
                .IsUnicode(false);

            modelBuilder.Entity<DocumentType>()
                .Property(e => e.DocumentName)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.EmployeeName)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.ResumeTitle)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.CurrentDesignation)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.CurrentCompany)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.OverallExperience)
                .HasPrecision(18, 0);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.RelevantExperience)
                .HasPrecision(18, 0);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.CurrentSalaryPerMonth)
                .HasPrecision(18, 0);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.ExpectedSalaryPerMonth)
                .HasPrecision(18, 0);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.CurrentLocation)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.PreferredLocation)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.KeySkills)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.Qualification)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.Address)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.WorkedOn)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.PinCode)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.Gender)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.MaritalStatus)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDetail>()
                .Property(e => e.Caste)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDocument>()
                .Property(e => e.DocumentDetails)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeDocument>()
                .Property(e => e.DocumentByteArray)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeEmploymentDetail>()
                .Property(e => e.CompanyName)
                .IsUnicode(false);

            modelBuilder.Entity<EmployeeEmploymentDetail>()
                .Property(e => e.WorkedOn)
                .IsUnicode(false);

            modelBuilder.Entity<MyCompany>()
                .Property(e => e.CompanyName)
                .IsUnicode(false);

            modelBuilder.Entity<Service>()
                .Property(e => e.ServiceName)
                .IsUnicode(false);

            modelBuilder.Entity<UserRolePermission>()
                .Property(e => e.PermissionName)
                .IsUnicode(false);

            modelBuilder.Entity<UserRole>()
                .Property(e => e.RoleName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.LoginName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.RecordStatus)
                .IsUnicode(false);
        }
    }
}
