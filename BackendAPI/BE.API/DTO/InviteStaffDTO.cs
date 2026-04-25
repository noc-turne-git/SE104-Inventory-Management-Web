namespace BackendAPI.BE.API.DTO;

public class InviteStaffDTO
{
    //public int InvitationId{ get; set; }  
    public int WarehouseId { get; set; }
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
}