namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.DAL.Entities;

public interface ITestItemService
{
    Task<IEnumerable<TestItem>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TestItem?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<TestItem> CreateAsync(string name, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}

