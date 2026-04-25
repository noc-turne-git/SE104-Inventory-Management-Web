namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class DeliveryItem : IEntity
{
    public int DeliveryItemId { get; set; }
    public int NoteId { get; set; } // FK
    public int ProductId { get; set; } // FK
    public int Quantity { get; set; }

    // navigation
    public DeliveryNote DeliveryNote { get; set; } = null!;

    public Product Product { get; set; } = null!;
    public string getKey() => DeliveryItemId.ToString();

}
