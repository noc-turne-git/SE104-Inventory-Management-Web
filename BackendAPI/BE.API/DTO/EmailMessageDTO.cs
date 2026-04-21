namespace BackendAPI.BE.API.DTO;
public class EmailMessageDTO
{
    public string ToEmail { get; set; } = null!;
    public string Subject { get; set; } = null!;
    public string Body { get; set; } = null!;

}