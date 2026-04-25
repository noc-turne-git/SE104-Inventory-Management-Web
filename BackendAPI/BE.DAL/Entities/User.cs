namespace BackendAPI.BE.DAL.Entities;
using System.ComponentModel.DataAnnotations;
using BackendAPI.BE.BLL.Interfaces;

/*abstract class User {
    - id: String
    - username: String
    - passwordHash: String
    - phone: String
    - email: String
    - address: String
    
    
}*/

public class User : IEntity
{
    public int UserId { get; set; } =0 ;
    //public string Username { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public DateTime Dob { get; set; } = DateTime.Now;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public bool IsVerified { get; set; } = false;
    public string getKey() => UserId.ToString();

    // navigation
    public List<Shift> Shifts { get; set; } = new();
    public List<Note> Notes { get; set; } = new();
    public List<PasswordResetToken> PasswordResetTokens { get; set; } = new();
    public List<InfractionTicket> InfractionTickets { get; set; } = new();
    public List<RefreshToken> RefreshTokens { get; set; } = new();
    public List<WarehouseStaff> WarehouseStaffs { get; set; } = new();
    public List<VerifyEmailToken> VerifyEmailTokens { get; set; } = new();
    public List<Invitation> Invitations { get; set; } = new();
    
}
