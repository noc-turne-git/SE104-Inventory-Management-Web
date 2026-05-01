namespace BackendAPI.BE.API.DTO;

public class WarehouseStaffDetailDTO
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = "Staff";
    public string AccountStatus { get; set; } = "Active";
    public decimal Salary { get; set; }
    public string HireDate { get; set; } = string.Empty;
    public string? Dob { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public List<StaffInfractionDTO> Infractions { get; set; } = new();
}

