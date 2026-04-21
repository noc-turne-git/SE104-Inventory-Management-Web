namespace BackendAPI.BE.API.DTO.Notes;

public class GoodsReceiptUpsertDTO
{
    public int SupplierId { get; set; }
    public string QualityCheckStatus { get; set; } = string.Empty;
    public int StockQuantity { get; set; }
    public int DefectiveQuantity { get; set; }
}

