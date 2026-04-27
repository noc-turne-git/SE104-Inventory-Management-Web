namespace BackendAPI.BE.API.DTO;

public class StaffInfractionDTO
{
    public string Id { get; set; } = string.Empty;
    public string Datetime { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public decimal Penalty { get; set; }
}

