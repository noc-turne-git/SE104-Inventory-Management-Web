namespace BackendAPI.BE.API.DTO;

public class ProductSupplierDTO
{
    public int ProductId { get; set; }
    public int SupplierId { get; set; }
    public string Product { get; set; } = string.Empty;
    public string Supplier { get; set; } = string.Empty;
    public string Type { get; set; } = "PRIMARY";
    public decimal Price { get; set; }
}

