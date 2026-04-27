using BackendAPI.BE.BLL.Interfaces;

namespace BackendAPI.BE.DAL.Entities;

public class ReceiptItem: IEntity
{
    public int ReceiptItemId { get; set; }
    public int NoteId { get; set; } // FK
    public int ProductId { get; set; } // FK
    public int Quantity { get; set; }
    public int DefectiveQuantity { get; set; }

    // navigation
    public GoodsReceipt GoodReceipt { get; set; } = null!;

    public Product Product { get; set; } = null!;
    public string getKey() => ReceiptItemId.ToString();
}
