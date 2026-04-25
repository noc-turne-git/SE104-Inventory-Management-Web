namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
// class DamageItem {
//     - damageItemId: String
//     - productId: String
//     - quantity: Integer
//     - reason: String
// }

public class DamageItem : IEntity
{
    public int DamageItemId { get; set; }
    public int ProductId { get; set; }
    public int NoteId { get; set; } // FK
    public int Quantity { get; set; }   
    public string Reason { get; set; } = string.Empty;

    // Navigation property
    public DamageNote DamageNote { get; set; } = null!;
    public Product Product { get; set; } = null!;

    public string getKey() => DamageItemId.ToString();
}
