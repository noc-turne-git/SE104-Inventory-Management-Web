namespace BackendAPI.BE.DAL.Entities;

using BackendAPI.BE.BLL.Interfaces;

public class RefreshToken : IEntity
{
    public int Id { get; set; }
    public string Token { get; set; } = null!;
    public int UserId { get; set; }
    public DateTime ExpiresAt { get; set; }

    // Navigation property
    public User User { get; set; } = null!;

    public string getKey() => Id.ToString();
}
