namespace BackendAPI.BE.API.DTO;
public class UserDTO
{
    public int UserId { get; set; }
    //public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public bool IsVerified {get; set;} = false;
}