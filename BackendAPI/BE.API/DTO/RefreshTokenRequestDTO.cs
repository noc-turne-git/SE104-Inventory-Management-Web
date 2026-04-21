namespace BackendAPI.BE.API.DTO;
public class RefreshTokenRequestDTO
{    
    public string RefreshToken { get; set; } = string.Empty;
    public string accessToken { get; set; } = string.Empty;
}