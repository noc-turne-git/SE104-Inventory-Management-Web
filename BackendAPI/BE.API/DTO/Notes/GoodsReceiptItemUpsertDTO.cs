namespace BackendAPI.BE.API.DTO.Notes;

public class GoodsReceiptItemUpsertDTO
{
    public int ProductId { get; set; }
    public int Ordered { get; set; }
    public int Received { get; set; }
    public int Defective { get; set; }
}

