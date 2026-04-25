namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class Supplier: IEntity
{
    public int SupplierId { get; set; }   
    public int WarehouseId { get; set; } // FK to Warehouse   

    public string Name { get; set; } = string.Empty;
    public string phone { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string getKey() => SupplierId.ToString();

    // Navigation properties
    public ICollection<ProductSupplier> ProductSuppliers { get; set; } = new List<ProductSupplier>();
    public Warehouse Warehouse { get; set; } = null!;
}
