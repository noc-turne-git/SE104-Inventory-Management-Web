namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
// Product
// -------------------------
// productId (PK)
// productName
// category
// description
// stockQuantity
// defectiveQuantity
// damagedQuantity
// sellPrice

public class Product: IEntity
{
    public int ProductId { get; set; }    
    public int WarehouseId { get; set; } 

    public string Sku { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal SellPrice { get; set; }
    public int StockQuantity { get; set; }
    public int DefectiveQuantity { get; set; }
    public int DamagedQuantity { get; set; }
  


    // Navigation properties
    public ICollection<DeliveryItem> DeliveryItems { get; set; } = new List<DeliveryItem>();
    public ICollection<ReceiptItem> ReceiptItems { get; set; } = new List<ReceiptItem>();
    public ICollection<DamageItem> DamageItems { get; set; } = new List<DamageItem>();
    public ICollection<ProductSupplier> ProductSuppliers { get; set; } = new List<ProductSupplier>();
    public Warehouse Warehouse { get; set; } = null!;

    public string getKey() => ProductId.ToString();
}
