namespace BackendAPI.BE.DAL.Entities;

using BackendAPI.BE.BLL.Interfaces;

public class VerifyEmailToken : IEntity
{
    public int VerifyEmailTokenId { get; set; }
    public string Token { get; set; } = null!;
    public string Email { get; set; } = string.Empty;
    public int UserId { get; set; }
    public DateTime ExpiresAt { get; set; }

    // Navigation property
    public User User { get; set; } = null!;

    public string getKey() => VerifyEmailTokenId.ToString();
}
