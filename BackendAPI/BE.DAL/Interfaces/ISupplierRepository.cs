using BackendAPI.BE.DAL.Entities;
namespace BackendAPI.BE.BLL.Interfaces;
public interface ISupplierRepository
{
    Task<IEnumerable<Supplier>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Supplier?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Supplier> AddAsync(Supplier model, CancellationToken cancellationToken = default);
    Task UpdateAsync(Supplier model, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(int id, CancellationToken cancellationToken = default);
}