namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.DAL.Entities;

public interface ISupplierService
{
    Task<IEnumerable<Supplier>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default);
    Task<Supplier?> GetByIdAsync(int warehouseId, int supplierId, CancellationToken cancellationToken = default);
    Task<Supplier> CreateAsync(int warehouseId, SupplierUpsertDTO model, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int warehouseId, int supplierId, SupplierUpsertDTO model, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int warehouseId, int supplierId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Supplier>> SearchAsync(int warehouseId, string? query, int limit = 20, CancellationToken cancellationToken = default);
}
