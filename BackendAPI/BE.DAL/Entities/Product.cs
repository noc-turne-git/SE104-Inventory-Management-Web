namespace BackendAPI.BE.DAL.Entities;
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

public class Product
{
    public int ProductId { get; set; }    
    public int OrganizationId { get; set; } 

    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public decimal SellPrice { get; set; }
    public int StockQuantity { get; set; }
    public int DefectiveQuantity { get; set; }
    public int DamagedQuantity { get; set; }
  


    // Navigation properties
    public ICollection<DeliveryItem> DeliveryItems { get; set; }
    public ICollection<ReceiptItem> ReceiptItems { get; set; }
    public ICollection<DamageItem> DamageItems { get; set; }
    public ICollection<ProductSupplier> ProductSuppliers { get; set; }
    public Organization Organization { get; set; }
}