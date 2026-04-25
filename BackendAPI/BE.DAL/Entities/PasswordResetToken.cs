namespace BackendAPI.BE.DAL.Entities;

using BackendAPI.BE.BLL.Interfaces;

public class PasswordResetToken : IEntity
{
    public int Id { get; set; }
    public string Token { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime Expiration { get; set; }

    public string getKey() => Id.ToString();
}
