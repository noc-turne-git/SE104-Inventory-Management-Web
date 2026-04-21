namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class SupplierService : ISupplierService
{
    private readonly IRepository<Supplier> _suppliers;

    public SupplierService(IRepository<Supplier> suppliers)
    {
        _suppliers = suppliers;
    }

    public Task<IEnumerable<Supplier>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default)
        => _suppliers.GetAsync(s => s.WarehouseId == warehouseId, cancellationToken);

    public async Task<Supplier?> GetByIdAsync(int warehouseId, int supplierId, CancellationToken cancellationToken = default)
    {
        var supplier = await _suppliers.GetByIdAsync(supplierId, cancellationToken);
        return supplier != null && supplier.WarehouseId == warehouseId ? supplier : null;
    }

    public async Task<Supplier> CreateAsync(int warehouseId, SupplierUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var entity = new Supplier
        {
            WarehouseId = warehouseId,
            Name = model.Name,
            phone = model.Phone,
            email = model.Email
        };

        await _suppliers.AddAsync(entity, cancellationToken);
        return entity;
    }

    public async Task<bool> UpdateAsync(int warehouseId, int supplierId, SupplierUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var supplier = await _suppliers.GetByIdAsync(supplierId, cancellationToken);
        if (supplier == null || supplier.WarehouseId != warehouseId) return false;

        supplier.Name = model.Name;
        supplier.phone = model.Phone;
        supplier.email = model.Email;

        return await _suppliers.UpdateAsync(supplier, cancellationToken);
    }

    public async Task<bool> DeleteAsync(int warehouseId, int supplierId, CancellationToken cancellationToken = default)
    {
        var supplier = await _suppliers.GetByIdAsync(supplierId, cancellationToken);
        if (supplier == null || supplier.WarehouseId != warehouseId) return false;

        return await _suppliers.DeleteAsync(supplierId, cancellationToken);
    }

    public async Task<IEnumerable<Supplier>> SearchAsync(int warehouseId, string? query, int limit = 20, CancellationToken cancellationToken = default)
    {
        limit = Math.Clamp(limit, 1, 100);
        query = query?.Trim();

        IEnumerable<Supplier> items;
        if (string.IsNullOrWhiteSpace(query))
        {
            items = await _suppliers.GetAsync(s => s.WarehouseId == warehouseId, cancellationToken);
        }
        else
        {
            items = await _suppliers.GetAsync(
                s => s.WarehouseId == warehouseId
                     && (s.Name.Contains(query)
                         || s.phone.Contains(query)
                         || s.email.Contains(query)),
                cancellationToken);
        }

        return items
            .OrderBy(s => s.Name)
            .ThenBy(s => s.SupplierId)
            .Take(limit);
    }
}
