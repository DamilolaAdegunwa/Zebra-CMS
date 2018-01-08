//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Zebra.DataRepository.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Language
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Language()
        {
            this.NodeFieldMaps = new HashSet<NodeFieldMap>();
            this.NodeLanguageMaps = new HashSet<NodeLanguageMap>();
        }
    
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public string CultureName { get; set; }
        public string LanguageCode { get; set; }
        public string CountryCode { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NodeFieldMap> NodeFieldMaps { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NodeLanguageMap> NodeLanguageMaps { get; set; }
    }
}