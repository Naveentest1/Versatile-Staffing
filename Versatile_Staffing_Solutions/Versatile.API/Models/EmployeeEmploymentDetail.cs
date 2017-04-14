namespace Versatile.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class EmployeeEmploymentDetail
    {
        [Key]
        public int EmployeeEmploymentId { get; set; }

        public int? EmployeeId { get; set; }

        [StringLength(100)]
        public string CompanyName { get; set; }

        [Column(TypeName = "date")]
        public DateTime? FromDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ToDate { get; set; }

        [StringLength(100)]
        public string WorkedOn { get; set; }

        public int? RecordStatus { get; set; }

        public DateTime? CreateDt { get; set; }

        public int? CreateId { get; set; }

        public DateTime? UpdateDt { get; set; }

        public int? UpdateId { get; set; }

        public virtual EmployeeDetail EmployeeDetail { get; set; }
    }
}
