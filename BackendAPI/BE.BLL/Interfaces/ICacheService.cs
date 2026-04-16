namespace BackendAPI.BE.BLL.Interfaces;
public interface ICacheService<T>
{
    Task<T?> GetAsync<T>(string key);
    Task SetAsync<T>(string key, T value, TimeSpan? expiration = null);
    Task RemoveAsync(string key);
}