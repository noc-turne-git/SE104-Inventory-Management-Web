namespace BackendAPI.BE.API.DTO;

public class ShiftViewDTO
{
    public string Id { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string? AssignedTo { get; set; }
    public string Status { get; set; } = "empty"; // filled | empty | urgent
    public string ShiftType { get; set; } = string.Empty;
    public string? Notes { get; set; }
}

