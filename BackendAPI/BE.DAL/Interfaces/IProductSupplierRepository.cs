using BackendAPI.BE.DAL.Entities;
namespace BackendAPI.BE.DAL.Interfaces;

public interface IProductSupplierRepository
{
    Task<ProductSupplier> AddAsync(ProductSupplier ps);
    Task UpdateAsync(ProductSupplier ps);
    Task DeleteAsync(int productId, int supplierId);

    Task<IEnumerable<ProductSupplier>> GetByProductIdAsync(int productId);
    Task<IEnumerable<ProductSupplier>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<ProductSupplier>> GetBySupplierIdAsync(int supplierId);
    Task<ProductSupplier?> GetByIdAsync(int productId, int supplierId, CancellationToken cancellationToken = default);
    Task<bool> ExistsAsync(int productId, int supplierId, CancellationToken cancellationToken = default);
}