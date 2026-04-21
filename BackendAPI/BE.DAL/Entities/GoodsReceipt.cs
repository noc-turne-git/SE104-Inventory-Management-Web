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
    public string qualityCheckStatus { get; set; }
    public DateTime Date { get; set; }
    public int SupplierId { get; set; } // FK
    public int StockQuantity { get; set; }
    public int DefectiveQuantity { get; set; }

    // Navigation properties
    public Supplier Supplier { get; set; }
    public ICollection<ReceiptItem> ReceiptItems { get; set; }
}

