namespace BackendAPI.Infrastructure.RedisCacheDecorator;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;

using Microsoft.Extensions.Caching.Distributed;

public class UserCacheDecorator : GenericCacheDecorator<User>, IUserRepository
{
    
    //private readonly IDistributedCache _cacheService;
    private readonly IUserRepository _inner;

    public UserCacheDecorator(IUserRepository inner, IDistributedCache cache) 
        : base(inner, cache) // Gọi constructor của lớp Generic để xử lý các hàm chung
    {
        _inner = inner;
    }


    public Task<User> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return _inner.GetByEmailAsync(email, cancellationToken);
    }

    
}