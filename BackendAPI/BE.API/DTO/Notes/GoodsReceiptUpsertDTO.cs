namespace BackendAPI.BE.API.DTO.Notes;

public class GoodsReceiptUpsertDTO
{
    public int SupplierId { get; set; }
    public string QualityCheckStatus { get; set; } = string.Empty;
    public List<GoodsReceiptItemUpsertDTO> Items { get; set; } = new();
}


