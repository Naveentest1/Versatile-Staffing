namespace Versatile.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ClientCompanyDetail
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ClientCompanyDetail()
        {
            EmployeeDetails = new HashSet<EmployeeDetail>();
            Users = new HashSet<User>();
        }

        [Key]
        public int ClientCompanyId { get; set; }

        [StringLength(1)]
        public string ClientCompanyName { get; set; }

        [StringLength(1)]
        public string RecordStatus { get; set; }

        public DateTime? CreateDt { get; set; }

        public int? CreateId { get; set; }

        public DateTime? UpdateDt { get; set; }

        public int? UpdateId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeeDetail> EmployeeDetails { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> Users { get; set; }
    }
}
