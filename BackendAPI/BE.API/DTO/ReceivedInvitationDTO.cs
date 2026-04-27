namespace BackendAPI.BE.API.DTO;

public class ReceivedInvitationDTO
{
    public int id { get; set; }
    public int WarehouseId { get; set; }
    public string WarehouseName { get; set; } = string.Empty;
    public string ownerId{ get; set; }
    public string WarehouseLocation { get; set; } = string.Empty;

    public int InviterUserId { get; set; }
    public string InviterFullName { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime sendTime { get; set; }
}

