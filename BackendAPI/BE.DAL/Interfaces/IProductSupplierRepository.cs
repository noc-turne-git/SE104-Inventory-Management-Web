using BackendAPI.BE.DAL.Entities;
namespace BackendAPI.BE.DAL.Interfaces;

public interface IProductSupplierRepository
{
    Task<ProductSupplier> AddAsync(ProductSupplier ps);
    Task UpdateAsync(ProductSupplier ps);
    Task DeleteAsync(string productId, string supplierId);

    Task<IEnumerable<ProductSupplier>> GetByProductIdAsync(string productId);
    Task<IEnumerable<ProductSupplier>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<ProductSupplier>> GetBySupplierIdAsync(string supplierId);
    Task<ProductSupplier?> GetByIdAsync(string productId, string supplierId, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(string productId, string supplierId, CancellationToken cancellationToken = default);
}