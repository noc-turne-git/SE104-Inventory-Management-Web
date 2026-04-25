namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;

public class Shift: IEntity
{
    public int ShiftId { get; set; }      // PK
    public int WarehouseId { get; set; } // FK to Warehouse

    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public int UserId { get; set; }   // FK

    public string Duty { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;

    public string getKey() => ShiftId.ToString();

    public User User { get; set; } = null!;      // navigation
    public Warehouse Warehouse { get; set; } = null!; // navigation
}
