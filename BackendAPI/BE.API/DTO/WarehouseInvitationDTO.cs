namespace BackendAPI.BE.API.DTO;

public class WarehouseInvitationDTO
{
    public int InvitationId { get; set; }
    public int WarehouseId { get; set; }

    public int InvitedUserId { get; set; }
    public string InvitedFullName { get; set; } = string.Empty;
    public string InvitedEmail { get; set; } = string.Empty;

    public int InviterUserId { get; set; }
    public string InviterFullName { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

