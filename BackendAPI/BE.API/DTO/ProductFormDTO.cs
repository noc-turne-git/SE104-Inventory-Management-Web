namespace BackendAPI.BE.API.DTO;

public class ProductFormDTO
{
    public int ProductId { get; set; }
    public string Sku { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public IFormFile? ImageFile { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal SellPrice { get; set; }
    public int StockQuantity { get; set; }
    public int DefectiveQuantity { get; set; }
    public int DamagedQuantity { get; set; }
    public string Status { get; set; } = "undefined";

    public ProductDTO ToProductDTO(string imageUrl)
    {
        return new ProductDTO
        {
            ProductId = ProductId,
            Sku = Sku,
            ImageUrl = imageUrl,
            Name = Name,
            Category = Category,
            Description = Description,
            SellPrice = SellPrice,
            StockQuantity = StockQuantity,
            DefectiveQuantity = DefectiveQuantity,
            DamagedQuantity = DamagedQuantity,
            Status = Status
        };
    }
}
