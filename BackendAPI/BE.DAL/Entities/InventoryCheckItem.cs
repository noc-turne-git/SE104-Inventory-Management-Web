namespace BackendAPI.BE.DAL.Entities;

using BackendAPI.BE.BLL.Interfaces;

public class InventoryCheckItem : IEntity
{
    public int InventoryCheckItemId { get; set; }
    public int NoteId { get; set; } // FK
    public int ProductId { get; set; } // FK
    public int StockQuantity { get; set; }
    public string Reason { get; set; } = string.Empty;

    public InventoryCheckNote InventoryCheckNote { get; set; } = null!;
    public Product Product { get; set; } = null!;
    public string getKey() => InventoryCheckItemId.ToString();
}

