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
    
    public partial class NodeFieldMap : IEntity
    {
        public System.Guid Id { get; set; }
        public Nullable<System.Guid> NodeId { get; set; }
        public Nullable<System.Guid> FieldId { get; set; }
        public string NodeData { get; set; }
    
        public virtual Field Field { get; set; }
        public virtual Node Node { get; set; }
    }
}
