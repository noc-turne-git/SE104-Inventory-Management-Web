namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
public class Invitation: IEntity
{
    public int InvitationId { get; set; }
    public int WarehouseId { get; set; }
    public int InvitedUserId { get; set; }
    public int InviterUserId { get; set; }
    public string Role { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = string.Empty;

    // Navigation properties
    public Warehouse Warehouse { get; set; } = null!;
    public User User { get; set; } = null!;
    //public User invited{ get; set; } = null!;
    public string getKey() => InvitationId.ToString(); // Assuming InvitationId is the unique identifier for Invitation

}
