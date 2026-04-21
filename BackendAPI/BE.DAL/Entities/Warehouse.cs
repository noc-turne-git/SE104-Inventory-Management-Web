
namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class Warehouse : IEntity
{
    public int WarehouseId { get; set; }
    public string Name { get; set; } = null!;
    public string Location { get; set; } = null!;
    public int CreatorId { get; set; } 
    public string getKey() => WarehouseId.ToString();
    
    // Navigation properties
    public User Creator { get; set; } = null!;
    public ICollection<WarehouseStaff> WarehouseStaffs { get; set; } = null!;
    public ICollection<Product> Products { get; set; } = null!;
    public ICollection<Supplier> Suppliers { get; set; } = null!;
    public ICollection<Shift> Shifts { get; set; } = null!;
    public ICollection<InfractionTicket> InfractionTickets { get; set; } = null!;
    public ICollection<Invitation> Invitations { get; set; } = null!;
}