using BackendAPI.BE.DAL.Entities;

namespace BackendAPI.BE.DAL.Interfaces;

public interface ITestItemRepository
{
    Task<IEnumerable<TestItem>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TestItem?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<TestItem> AddAsync(TestItem model, CancellationToken cancellationToken = default);
    Task UpdateAsync(TestItem model, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default);
}
