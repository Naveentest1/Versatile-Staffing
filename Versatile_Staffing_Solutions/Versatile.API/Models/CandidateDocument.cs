namespace Versatile.API.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CandidateDocument
    {
        public int? DocumentTypeId { get; set; }

        [StringLength(1)]
        public string DocumentDetails { get; set; }

        [StringLength(1)]
        public string DocumentByteArray { get; set; }

        public int? CandidateId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CandidateDocumentId { get; set; }

        public int? RecordStatus { get; set; }

        public DateTime? CreateDt { get; set; }

        public int? CreateId { get; set; }

        public DateTime? UpdateDt { get; set; }

        public int? UpdateId { get; set; }

        public virtual CandidateDetail CandidateDetail { get; set; }

        public virtual DocumentType DocumentType { get; set; }
    }
}
