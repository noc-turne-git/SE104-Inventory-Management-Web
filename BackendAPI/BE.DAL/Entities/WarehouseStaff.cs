namespace BackendAPI.BE.DAL.Entities;

public class OrganizationMember
{
    public int OrganizationId { get; set; }
    public int UserId { get; set; }
    public string Role { get; set; } = string.Empty;
    
    // Navigation properties
    public Organization Organization { get; set; } = null!;
    public User User { get; set; } = null!;
}