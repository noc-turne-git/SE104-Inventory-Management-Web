namespace BackendAPI.BE.DAL.Entities;

using BackendAPI.BE.BLL.Interfaces;

public class OTP : IEntity
{
    public int Id { get; set; }
    public string Code { get; set; } = null!;
    public string Email { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime Expiration { get; set; }
    public bool IsUsed { get; set; }

    public string getKey() => Id.ToString();
    
}
