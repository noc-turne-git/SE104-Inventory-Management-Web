namespace BackendAPI.BE.API.DTO;

public class ProductSupplierUpsertDTO
{
    public int ProductId { get; set; }
    public int SupplierId { get; set; }
    public string Type { get; set; } = "PRIMARY";
    public decimal Price { get; set; }
}

