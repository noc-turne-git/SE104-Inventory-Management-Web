namespace BackendAPI.Infrastructure.RedisCacheDecorator;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;

using Microsoft.Extensions.Caching.Distributed;

public class UserCacheDecorator : GenericCacheDecorator<User>, IUserRepository
{
    
    private readonly IDistributedCache _cache;
    private readonly IUserRepository _inner;

    public UserCacheDecorator(IUserRepository inner, IDistributedCache cache) 
        : base(inner, cache) // Gọi constructor của lớp Generic để xử lý các hàm chung
    {
        _inner = inner;
        _cache = cache;
    }


    public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        string key = $"User:Email:{email}";
        // 1. Thử lấy từ Cache
        var cacheEntity = await getFromCache(key, cancellationToken);
        if (cacheEntity != null) return cacheEntity;




        var entity = await _inner.GetByEmailAsync(email, cancellationToken);
        // 3. Lưu vào Cache
        if (entity != null)
        {
            await SetCacheAsync(key, entity, 10, cancellationToken);
        }
        return entity;
    }

}
