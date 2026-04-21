namespace BackendAPI.BE.DAL.Interfaces;
using System.Linq.Expressions;
using BackendAPI.BE.BLL.Interfaces;

public interface IRepository<T> where T : class, IEntity
{
    Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<T?> GetByIdAsync(object id, CancellationToken cancellationToken = default);
    Task<T?> GetByIdAsync(object Id1, object Id2, CancellationToken cancellationToken= default);
    Task<IEnumerable<T>> GetBy1stIdAsync(object Id1, CancellationToken cancellationToken = default);
    Task<IEnumerable<T>> GetBy2ndIdAsync(object id, CancellationToken cancellationToken = default);
   
    Task<T> AddAsync(T entity, CancellationToken cancellationToken = default);
    
    Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default);
    
    Task<bool> DeleteAsync(object id, CancellationToken cancellationToken = default);
    Task DeleteAsync(object id1, object id2, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(object id, CancellationToken cancellationToken = default);
    Task<IEnumerable<T>> GetAsync(
    Expression<Func<T, bool>> predicate,
    CancellationToken cancellationToken = default);

}
