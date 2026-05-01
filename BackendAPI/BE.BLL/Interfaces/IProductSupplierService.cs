namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO;

public interface IProductSupplierService
{
    Task<IEnumerable<ProductSupplierDTO>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default);
    Task<IEnumerable<ProductSupplierDTO>> GetByProductIdAsync(int warehouseId, int productId, CancellationToken cancellationToken = default);
    Task<IEnumerable<ProductSupplierDTO>> GetBySupplierIdAsync(int warehouseId, int supplierId, CancellationToken cancellationToken = default);
    Task<ProductSupplierDTO?> GetByIdAsync(int warehouseId, int productId, int supplierId, CancellationToken cancellationToken = default);
    Task<ProductSupplierDTO> UpsertAsync(int warehouseId, ProductSupplierUpsertDTO model, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int warehouseId, int productId, int supplierId, CancellationToken cancellationToken = default);
}

