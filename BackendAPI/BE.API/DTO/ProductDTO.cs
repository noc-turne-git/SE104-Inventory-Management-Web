namespace BackendAPI.BE.API.DTO;

public class ProductDTO
{
    public int ProductId { get; set; }     

    public string Name { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public decimal SellPrice { get; set; }
    public int StockQuantity { get; set; }
    public int DefectiveQuantity { get; set; }
    public int DamagedQuantity { get; set; }
}