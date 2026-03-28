namespace BackendAPI.BE.DAL.Entities;
using System.ComponentModel.DataAnnotations;

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
    public int UserId { get; set; } =0 ;
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    //public bool isVerified {get; set;}= false;

    // navigation
    public List<Shift> Shifts { get; set; }
    public List<Note> Notes { get; set; }
    public List<PasswordResetToken> PasswordResetTokens { get; set; }
    public List<InfractionTicket> InfractionTickets { get; set; }
    public List<RefreshToken> RefreshTokens { get; set; }
    public List<WarehouseStaff> WarehouseStaffs { get; set; }
    
}
