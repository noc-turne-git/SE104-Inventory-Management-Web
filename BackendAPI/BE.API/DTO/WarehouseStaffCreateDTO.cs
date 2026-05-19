namespace BackendAPI.BE.API.DTO;

public class WarehouseStaffCreateDTO
{
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = "Staff";
    public string? AccountStatus { get; set; }
    public decimal? Salary { get; set; }
    public DateTime? HireDate { get; set; }
}
