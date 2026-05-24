using BackendAPI.BE.BLL.Interfaces;
using Microsoft.Extensions.Caching.Distributed; //Đây là abstraction cache phân tán (Cache nằm ngoài app), share được giữa server
using System.Text;
using System.Text.Json; 

namespace BackendAPI.BE.BLL.Services;

public class CacheService<T>:ICacheService<T>
{
    private readonly IDistributedCache _distributedCache; //Service cache thật sự.

    public CacheService(IDistributedCache distributedCache)
    {
        _distributedCache = distributedCache;
    }
    
    public async Task<T?> GetAsync<T>(string key)
    {
        var cachedData = await _distributedCache.GetStringAsync(key);
        if (string.IsNullOrEmpty(cachedData)) return default;

        return JsonSerializer.Deserialize<T>(cachedData); // giải ma json --> object
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = expiration ?? TimeSpan.FromMinutes(10) //Cache sẽ hết hạn sau expiration, nếu expiration bị null thì mặc định là 10 phút
        };

        var jsonData = JsonSerializer.Serialize(value);
        await _distributedCache.SetStringAsync(key, jsonData, options);
    }

    public async Task RemoveAsync(string key)
    {
        await _distributedCache.RemoveAsync(key);
    }
}

// method và class đều có <T? thì class là <Product>, method là <Staff> --> conflict 
//T : generic tức là 1 kiểu dữ liệu bất kì, vd Product, Staff, Note