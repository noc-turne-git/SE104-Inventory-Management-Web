using BackendAPI.BE.DAL.Entities;

namespace BackendAPI.BE.DAL.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<User?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<User> AddAsync(User model, CancellationToken cancellationToken = default);
    Task UpdateAsync(User model, CancellationToken cancellationToken = default);
    Task DeleteAsync(string id, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(string id, CancellationToken cancellationToken = default);
}