namespace BackendAPI.BE.DAL.Interfaces;

using BackendAPI.BE.DAL.Entities;
public interface IOTPRepository : IRepository<OTP>
{
    Task<OTP?> GetByEmailAsync(string email);
    Task<OTP?> GetValidByEmailAndCodeAsync(string email, string code);
    Task InvalidateActiveByEmailAsync(string email);
    Task MarkAsUsedAsync(int id);
}
