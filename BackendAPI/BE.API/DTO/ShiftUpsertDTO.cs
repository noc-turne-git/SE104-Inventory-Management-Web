namespace BackendAPI.BE.API.DTO;

public class ShiftUpsertDTO
{
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int UserId { get; set; }
    public string Duty { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
}

