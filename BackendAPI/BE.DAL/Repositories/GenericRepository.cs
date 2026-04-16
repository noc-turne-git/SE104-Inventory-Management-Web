using BackendAPI.BE.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using BackendAPI.BE.DAL.Data;
using System.Linq.Expressions;
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

    public async Task<bool> DeleteAsync(object id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Set<T>().FindAsync(new object[] { id }, cancellationToken);
        
        // Nếu không tìm thấy ngay từ đầu, thoát luôn
        if (entity == null) return false;

        try 
        {
            _context.Set<T>().Remove(entity);
            var affectedRows = await _context.SaveChangesAsync(cancellationToken);
            return affectedRows > 0; // Trả về true nếu có ít nhất 1 dòng trong DB thay đổi
        }
        catch (DbUpdateConcurrencyException)
        {
            
            // _logger.LogInformation("Entity already deleted.");
            return false; 
        }
    }

    public async Task DeleteAsync(object id1, object id2, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Set<T>().FindAsync(new object[] { id1, id2 }, cancellationToken);

        if (entity != null)
        {
            _context.Set<T>().Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);
        }
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

    public async Task<T?> GetByIdAsync(object Id1, object Id2, CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>().FindAsync(new object[]{Id1,Id2}, cancellationToken);
    }

    public async Task<IEnumerable<T>> GetBy1stIdAsync(object Id1, CancellationToken cancellationToken = default)
    {
        var firstKeyName = _context.Model.FindEntityType(typeof(T))!
        .FindPrimaryKey()!
        .Properties[0].Name;

        return await _context.Set<T>()
            .AsNoTracking() // Tăng hiệu suất vì chỉ để đọc
            .Where(e => EF.Property<object>(e, firstKeyName).Equals(Id1))
            .ToListAsync(cancellationToken); 
    }

    public async Task<IEnumerable<T>> GetBy2ndIdAsync(object Id2, CancellationToken cancellationToken = default)
    {
        var secondKeyName = _context.Model.FindEntityType(typeof(T))!
        .FindPrimaryKey()!
        .Properties[1].Name;

        return await _context.Set<T>()
            .AsNoTracking() // Tăng hiệu suất vì chỉ để đọc
            .Where(e => EF.Property<object>(e, secondKeyName).Equals(Id2))
            .ToListAsync(cancellationToken); 
    }

    public async Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        var key = _context.Model.FindEntityType(typeof(T))!
            .FindPrimaryKey()!
            .Properties
            .Select(p => p.PropertyInfo!.GetValue(entity))
            .ToArray();

        var existing = await _context.Set<T>().FindAsync(key, cancellationToken);
        
        if (existing == null) return false; // Trả về false nếu không tìm thấy để update

        _context.Entry(existing).CurrentValues.SetValues(entity);

        var affectedRows = await _context.SaveChangesAsync(cancellationToken);
        return affectedRows > 0; // Trả về true nếu có ít nhất 1 dòng trong DB thay đổi
    }

    public async Task<bool> ExistsAsync(object id, CancellationToken cancellationToken = default)
    {
        var entity = await _context.Set<T>().FindAsync(id, cancellationToken);
        return entity != null;
    }
    public async Task<IEnumerable<T>> GetAsync(
        Expression<Func<T, bool>> predicate,
        CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>()
            .Where(predicate)
            .ToListAsync(cancellationToken);
    }
}