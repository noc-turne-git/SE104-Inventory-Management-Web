namespace BackendAPI.BE.API.DTO;
public class ResponseLoginDTO
{
    public bool Success { get; set; }
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public UserDTO User { get; set; } = null!;
}
