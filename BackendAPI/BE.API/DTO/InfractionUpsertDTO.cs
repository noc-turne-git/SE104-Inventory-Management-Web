namespace BackendAPI.BE.API.DTO;

public class InfractionUpsertDTO
{
    public int UserId { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Penalty { get; set; }
}

