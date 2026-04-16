namespace BackendAPI.Infrastructure.RedisCacheDecorator;
using BackendAPI.BE.DAL.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using System.Text;
using BackendAPI.BE.BLL.Interfaces;
using System.Linq.Expressions;

public class GenericCacheDecorator<T> : IRepository<T> where T : class, IEntity
{
    private readonly IRepository<T> _inner;
    private readonly IDistributedCache _cache;
    private readonly string _entityName;

    public GenericCacheDecorator(IRepository<T> inner, IDistributedCache cache)
    {
        _inner = inner;
        _cache = cache;
        _entityName = typeof(T).Name; // Tự động lấy tên Class làm Prefix
    }
    
    private byte[] Serialize<T>(T obj)
    {
        var json = JsonSerializer.Serialize(obj);
        return Encoding.UTF8.GetBytes(json);
    }

    private T? Deserialize<T>(byte[] bytes)
    {
        var json = Encoding.UTF8.GetString(bytes);
        return JsonSerializer.Deserialize<T>(json);
    }
    public async Task<T?> GetByIdAsync(object id, CancellationToken cancellationToken = default)
    {
        string key = $"{_entityName}:{id}";
        
        // 1. Thử lấy từ Cache
        var cachedData = await _cache.GetAsync(key, cancellationToken);
        if (cachedData != null) return Deserialize<T>(cachedData);

        // 2. Cache miss -> DB
        var entity = await _inner.GetByIdAsync(id, cancellationToken);

        // 3. Lưu vào Cache
        if (entity != null) 
            await _cache.SetAsync(key, Serialize(entity), new DistributedCacheEntryOptions {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
            });

        return entity;
    }

    public async Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        var result = await _inner.UpdateAsync(entity, cancellationToken);
        if (result)
        {
            await _cache.RemoveAsync($"{_entityName}:{entity.getKey()}", cancellationToken);
        }
        return result;
    }

    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        var result = await _inner.AddAsync(entity, cancellationToken);
        return result;
    }

    public async Task<bool> DeleteAsync(object id, CancellationToken cancellationToken = default)
    {
        var result = await _inner.DeleteAsync(id, cancellationToken);
        if (result)
        {
            await _cache.RemoveAsync($"{_entityName}:{id}", cancellationToken);
        }
        return result;
    }

    public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _inner.GetAllAsync(cancellationToken);
    }

    public async Task<T?> GetByIdAsync(object id1, object id2, CancellationToken cancellationToken = default)
    {
        string key = $"{_entityName}:{id1}:{id2}";
        
        // 1. Thử lấy từ Cache
        var cachedData = await _cache.GetAsync(key, cancellationToken);
        if (cachedData != null) return Deserialize<T>(cachedData);
        // 2. Cache miss -> DB
        return await _inner.GetByIdAsync(id1, id2, cancellationToken);
    }

    public async Task<IEnumerable<T>> GetBy1stIdAsync(object id1, CancellationToken cancellationToken = default)
    {        
        return await _inner.GetBy1stIdAsync(id1, cancellationToken);
    }

    public async Task<IEnumerable<T>> GetBy2ndIdAsync(object id2, CancellationToken cancellationToken = default)
    {
        return await _inner.GetBy2ndIdAsync(id2, cancellationToken);
    }

    public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
    {
        return await _inner.GetAsync(predicate, cancellationToken);
    }

    public async Task<bool> ExistsAsync(object id, CancellationToken cancellationToken = default)
    {
        return await _inner.ExistsAsync(id, cancellationToken);
    }

    public async Task DeleteAsync(object id1, object id2, CancellationToken cancellationToken = default)
    {
        await _inner.DeleteAsync(id1, id2, cancellationToken);
        await _cache.RemoveAsync($"{_entityName}:{id1}:{id2}", cancellationToken);
    }




}