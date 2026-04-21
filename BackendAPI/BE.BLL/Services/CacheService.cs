using BackendAPI.BE.BLL.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using System.Text;
using System.Text.Json; 

namespace BackendAPI.BE.BLL.Services;

public class CacheService<T>:ICacheService<T>
{
    private readonly IDistributedCache _distributedCache;

    public CacheService(IDistributedCache distributedCache)
    {
        _distributedCache = distributedCache;
    }

    
    public async Task<T?> GetAsync<T>(string key)
    {
        var cachedData = await _distributedCache.GetStringAsync(key);
        if (string.IsNullOrEmpty(cachedData)) return default;

        return JsonSerializer.Deserialize<T>(cachedData);
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = expiration ?? TimeSpan.FromMinutes(10)
        };

        var jsonData = JsonSerializer.Serialize(value);
        await _distributedCache.SetStringAsync(key, jsonData, options);
    }

    public async Task RemoveAsync(string key)
    {
        await _distributedCache.RemoveAsync(key);
    }
}