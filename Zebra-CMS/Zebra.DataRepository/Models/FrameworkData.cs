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
    
    public partial class FrameworkData
    {
        public System.Guid Id { get; set; }
        public System.Guid RelatedId { get; set; }
        public string ProcessName { get; set; }
        public string ProcessData { get; set; }
        public string Value { get; set; }
        public System.Guid NodeId { get; set; }
    
        public virtual Node Node { get; set; }
    }
}
