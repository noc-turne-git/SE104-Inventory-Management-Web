namespace BackendAPI.BE.DAL.Entities;
// class GoodsReceipt {
//     - qualityCheckStatus: String
//     - supplierId: String
//     - stockQuantity: Integer
//     - defectiveQuantity: Integer
//     + processQualityCheck()
// }
public class GoodsReceipt: Note
{
    public string qualityCheckStatus { get; set; } = string.Empty;
    public int SupplierId { get; set; } // FK
    public int StockQuantity { get; set; }
    public int DefectiveQuantity { get; set; }

    // Navigation properties
    public Supplier Supplier { get; set; } = null!;
    public ICollection<ReceiptItem> ReceiptItems { get; set; } = new List<ReceiptItem>();
}
