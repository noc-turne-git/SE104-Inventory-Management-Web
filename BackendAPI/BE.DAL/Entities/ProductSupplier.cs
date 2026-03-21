namespace BackendAPI.BE.DAL.Entities;
public class ProductSupplier
{
    public string ProductId { get; set; }    // PK, FK
    public string SupplierId { get; set; }   // PK, FK
    public decimal Price { get; set; }

    // Navigation properties
    public Product Product { get; set; }
    public Supplier Supplier { get; set; }
}