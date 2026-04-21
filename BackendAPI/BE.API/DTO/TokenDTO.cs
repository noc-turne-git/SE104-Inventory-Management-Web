namespace BackendAPI.BE.API.DTO;
public class TokenDTO
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
}