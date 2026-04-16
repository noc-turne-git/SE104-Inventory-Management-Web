namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;

public class Shift: IEntity
{
    public int ShiftId { get; set; }      // PK
    public int WarehouseId { get; set; } // FK to Warehouse

    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public int UserId { get; set; }   // FK

    public string Duty { get; set; }
    public string Note { get; set; }

    public string getKey() => ShiftId.ToString();

    public User User { get; set; }      // navigation
    public Warehouse Warehouse { get; set; } // navigation
}