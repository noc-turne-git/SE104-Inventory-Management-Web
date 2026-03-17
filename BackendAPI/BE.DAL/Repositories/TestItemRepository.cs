using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.BLL.Models;
using BackendAPI.BE.DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.BE.DAL.Repositories;

public class TestItemRepository : ITestItemRepository
{
    private readonly AppDbContext _context;

    public TestItemRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TestItem>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.TestItems.ToListAsync(cancellationToken);
    }

    public async Task<TestItem?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.TestItems.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<TestItem> AddAsync(TestItem model, CancellationToken cancellationToken = default)
    {
        _context.TestItems.Add(model);
        await _context.SaveChangesAsync(cancellationToken);
        return model;
    }

    public async Task UpdateAsync(TestItem model, CancellationToken cancellationToken = default)
    {
        _context.TestItems.Update(model);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var item = await _context.TestItems.FindAsync(new object[] { id }, cancellationToken);
        if (item != null)
        {
            _context.TestItems.Remove(item);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    public async Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.TestItems.AnyAsync(x => x.Id == id, cancellationToken);
    }
}
