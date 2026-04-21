namespace BackendAPI.BE.DAL.Interfaces;

using BackendAPI.BE.DAL.Entities;
public interface IOTPRepository : IRepository<OTP>
{
    Task<OTP> GetByEmailAsync(string email);
    Task MarkAsUsedAsync(int id);
}