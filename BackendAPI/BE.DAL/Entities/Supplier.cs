namespace BackendAPI.BE.DAL.Entities;
public class Supplier
{
    public int SupplierId { get; set; }   
    public int WarehouseId { get; set; } // FK to Warehouse   

    public string Name { get; set; }
    public string phone { get; set; }
    public string email { get; set; }

    // Navigation properties
    public ICollection<ProductSupplier> ProductSuppliers { get; set; }
    public Warehouse Warehouse { get; set; }
}