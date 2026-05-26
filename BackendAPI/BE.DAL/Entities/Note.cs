namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class Note: IEntity
{
    public int NoteId { get; set; }
    public int WarehouseId { get; set; } // FK to Warehouse
    public int UserId { get; set; } // FK
    public DateTime Date { get; set; }
    public string type { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;

    // navigation
    public User User { get; set; } = null!;
    public Warehouse Warehouse { get; set; } = null!;
    public string getKey() => NoteId.ToString();
}
