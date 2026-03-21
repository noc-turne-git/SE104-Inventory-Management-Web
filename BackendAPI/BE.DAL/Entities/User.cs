namespace BackendAPI.BE.DAL.Entities;

/*abstract class User {
    - id: String
    - username: String
    - passwordHash: String
    - phone: String
    - email: String
    - address: String
    
    
}*/

public class User
{
    public string UserId { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    
}
