using BackendAPI.BE.DAL.Entities;
namespace BackendAPI.BE.DAL.Interfaces;

public interface IStaffRepository
{
    Task<IEnumerable<Staff>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Staff?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<Staff> AddAsync(Staff model, CancellationToken cancellationToken = default);
    Task UpdateAsync(Staff model, CancellationToken cancellationToken = default);
    Task DeleteAsync(string id, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(string id, CancellationToken cancellationToken = default);
}