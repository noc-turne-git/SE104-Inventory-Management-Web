using BackendAPI.BE.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using BackendAPI.BE.DAL.Data;
namespace BackendAPI.BE.DAL.Repositories;
public class Repository<T> : IRepository<T> where T : class
{
    protected readonly AppDbContext _context;

    public Repository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        await _context.Set<T>().AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task DeleteAsync(object id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Set<T>().FindAsync(id, cancellationToken);
        if (entity == null) return ;

        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        
    }

    public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>()
            .ToListAsync(cancellationToken);
    }

    public async Task<T?> GetByIdAsync(object id, CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>().FindAsync(id, cancellationToken);
    }

    public async Task UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        var key = _context.Model.FindEntityType(typeof(T))!
            .FindPrimaryKey()!
            .Properties
            .Select(p => p.PropertyInfo!.GetValue(entity))
            .ToArray();

        var existing = await _context.Set<T>().FindAsync(key);
    }

    public async Task<bool> ExistsAsync(string id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Set<T>().FindAsync(id, cancellationToken);
        return entity != null;
    }
}