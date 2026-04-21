namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class TestItemService : ITestItemService
{
    private readonly IRepository<TestItem> _items;

    public TestItemService(IRepository<TestItem> items)
    {
        _items = items;
    }

    public Task<IEnumerable<TestItem>> GetAllAsync(CancellationToken cancellationToken = default)
        => _items.GetAllAsync(cancellationToken);

    public Task<TestItem?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => _items.GetByIdAsync(id, cancellationToken);

    public async Task<TestItem> CreateAsync(string name, CancellationToken cancellationToken = default)
    {
        var entity = new TestItem { Name = name };
        await _items.AddAsync(entity, cancellationToken);
        return entity;
    }

    public Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
        => _items.DeleteAsync(id, cancellationToken);
}

