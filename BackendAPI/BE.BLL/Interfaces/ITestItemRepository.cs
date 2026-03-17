using BackendAPI.BE.BLL.Models;

namespace BackendAPI.BE.BLL.Interfaces;

public interface ITestItemRepository
{
    Task<IEnumerable<TestItem>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TestItem?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<TestItem> AddAsync(TestItem model, CancellationToken cancellationToken = default);
    Task UpdateAsync(TestItem model, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default);
}
