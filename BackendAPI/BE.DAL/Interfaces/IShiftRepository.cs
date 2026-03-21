using BackendAPI.BE.DAL.Entities;
namespace BackendAPI.BE.DAL.Interfaces;
public interface IShiftRepository
{
    Task<IEnumerable<Shift>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Shift?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<Shift> AddAsync(Shift model, CancellationToken cancellationToken = default);
    Task UpdateAsync(Shift model, CancellationToken cancellationToken = default);
    Task DeleteAsync(string id, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(string id, CancellationToken cancellationToken = default);
}