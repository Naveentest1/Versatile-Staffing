namespace Versatile.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CandidateDetail
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CandidateDetail()
        {
            CandidateDocuments = new HashSet<CandidateDocument>();
            CandidatePreviousEmploymentDetails = new HashSet<CandidatePreviousEmploymentDetail>();
        }

        [StringLength(1)]
        public string CandidateName { get; set; }

        [StringLength(1)]
        public string ResumeTitle { get; set; }

        [StringLength(1)]
        public string CurrentDesignation { get; set; }

        [StringLength(1)]
        public string CurrentCompany { get; set; }

        public decimal? OverallExperience { get; set; }

        public decimal? RelevantExperience { get; set; }

        public decimal? CurrentSalaryPerMonth { get; set; }

        public decimal? ExpectedSalaryPerMonth { get; set; }

        [StringLength(1)]
        public string CurrentLocation { get; set; }

        [StringLength(1)]
        public string PreferredLocation { get; set; }

        [StringLength(1)]
        public string KeySkills { get; set; }

        [StringLength(1)]
        public string Qualification { get; set; }

        [StringLength(1)]
        public string Address { get; set; }

        [StringLength(1)]
        public string WorkedOn { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Dob { get; set; }

        [StringLength(1)]
        public string PinCode { get; set; }

        [StringLength(1)]
        public string Gender { get; set; }

        [StringLength(1)]
        public string MaritalStatus { get; set; }

        [Key]
        public int CandidateId { get; set; }

        [StringLength(1)]
        public string Caste { get; set; }

        public int? ServiceId { get; set; }

        public int? UserId { get; set; }

        public int? RecordStatus { get; set; }

        public DateTime? CreateDt { get; set; }

        public int? CreateId { get; set; }

        public DateTime? UpdateDt { get; set; }

        public int? UpdateId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CandidateDocument> CandidateDocuments { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CandidatePreviousEmploymentDetail> CandidatePreviousEmploymentDetails { get; set; }

        public virtual Service Service { get; set; }

        public virtual User User { get; set; }
    }
}