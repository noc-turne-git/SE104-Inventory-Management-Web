namespace BackendAPI.Infrastructure.RedisCacheDecorator;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
using StackExchange.Redis;

using Microsoft.Extensions.Caching.Distributed;

public class WarehouseCacheDecorator : GenericCacheDecorator<Warehouse>, IWarehouseRepository
{
    
    private readonly IDistributedCache _cache;
    private readonly IWarehouseRepository _inner;

    public WarehouseCacheDecorator(IWarehouseRepository inner, IDistributedCache cache) 
        : base(inner, cache) // Gọi constructor của lớp Generic để xử lý các hàm chung
    {
        _inner = inner;
        _cache = cache;
    }


    public async Task<int> GetProductCountAsync(int id, CancellationToken cancellationToken = default)
    {
        string key = $"Warehouse:ProductCount:{id}";

        try 
        {
            var cachedData = await _cache.GetAsync(key, cancellationToken);
            if (cachedData != null) return Deserialize<int>(cachedData);
        }
        catch (RedisConnectionException) 
        {
            // Log lại lỗi nhưng không để app bị sập
            Console.WriteLine("Redis is down, cannot get cache...");
        }

        var result = await _inner.GetProductCountAsync(id, cancellationToken);
        
            try
            {
                await _cache.SetAsync(key, Serialize(result), new DistributedCacheEntryOptions {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                }, cancellationToken);
            } catch (RedisConnectionException) {
                // Log lại lỗi nhưng không để app bị sập
                Console.WriteLine("Redis is down, cannot set cache...");
            }
        return result;
    }

    
}
