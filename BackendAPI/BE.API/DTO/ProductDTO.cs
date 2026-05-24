namespace BackendAPI.BE.API.DTO;

using System.Text.Json.Serialization;

public class ProductDTO
{
    public int ProductId { get; set; }     

    [JsonPropertyName("sku")]
    public string Sku { get; set; } = string.Empty;
    //public string ImageUrl { get; set; } = string.Empty;
    public string? ImageUrl { get; set; } = null;
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal SellPrice { get; set; }
    public int StockQuantity { get; set; }
    public int DefectiveQuantity { get; set; }
    public int DamagedQuantity { get; set; }
    public string Status { get; set; } = "undefined";
}
