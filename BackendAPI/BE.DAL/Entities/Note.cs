namespace BackendAPI.BE.DAL.Entities;
public class Note
{
    public int NoteId { get; set; }
    public int WarehouseId { get; set; } // FK to Warehouse
    public int UserId { get; set; } // FK
    public DateTime Date { get; set; }
    public string type { get; set; }

    // navigation
    public User User { get; set; }
    public Warehouse Warehouse { get; set; }
}