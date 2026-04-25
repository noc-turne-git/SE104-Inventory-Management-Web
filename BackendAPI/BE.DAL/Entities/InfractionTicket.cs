namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class InfractionTicket: IEntity
{
    public int InfractionTicketId { get; set; }
    public int WarehouseId { get; set; } // FK to Warehouse

    public int UserId { get; set; } // FK

    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Penalty { get; set; }

    // navigation
    public User User { get; set; } = null!;
    public Warehouse Warehouse { get; set; } = null!;
    public string getKey() => InfractionTicketId.ToString();
}
