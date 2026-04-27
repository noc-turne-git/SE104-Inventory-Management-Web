namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class ProductSupplier : IEntity
{
    public int ProductId { get; set; }    // PK, FK
    public int SupplierId { get; set; }   // PK, FK
    public decimal Price { get; set; }

    // Navigation properties
    public Product Product { get; set; } = null!;
    public Supplier Supplier { get; set; } = null!;
    public string getKey() => $"{ProductId}:{SupplierId}";
}
