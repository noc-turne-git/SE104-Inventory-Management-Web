namespace BackendAPI.BE.DAL.Entities;

public class DamageNote : Note
{
    public string Description { get; set; } = string.Empty;

    // navigation
    public ICollection<DamageItem> DamageItems { get; set; } = new List<DamageItem>();

}


// IEnumerable<T> : DUYỆT dữ liệu 
//     ↓
// ICollection<T> :  Add, Remove, Count, Clear
//     ↓
// IList<T> : [index], Insert(), RemoveAt()
//     ↓
// List<T> : 


// class nay ko co getKey vi no ket thua tu Note, Note co getKey roi