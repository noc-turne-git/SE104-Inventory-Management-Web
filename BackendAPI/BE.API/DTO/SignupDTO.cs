namespace BackendAPI.BE.API.DTO;
public class SignupDTO
{
    //public string Username { get; set; } = string.Empty; 
    public string FullName { get; set; } = string.Empty;       
    public string Email { get; set; } = string.Empty;    
    public string dob { get; set; } = string.Empty;    
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;    
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}