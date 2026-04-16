namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class Supplier: IEntity
{
    public int SupplierId { get; set; }   
    public int WarehouseId { get; set; } // FK to Warehouse   

    public string Name { get; set; }
    public string phone { get; set; }
    public string email { get; set; }
    public string getKey() => SupplierId.ToString();

    // Navigation properties
    public ICollection<ProductSupplier> ProductSuppliers { get; set; }
    public Warehouse Warehouse { get; set; }
}