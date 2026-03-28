namespace BackendAPI.BE.DAL.Entities;
public class InfractionTicket
{
    public int InfractionTicketId { get; set; }
    public int WarehouseId { get; set; } // FK to Warehouse

    public int UserId { get; set; } // FK

    public DateTime Date { get; set; }
    public string Description { get; set; }
    public decimal Penalty { get; set; }

    // navigation
    public User User { get; set; }
    public Warehouse Warehouse { get; set; }
}