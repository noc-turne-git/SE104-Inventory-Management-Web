namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;

public class ProductSupplierService : IProductSupplierService
{
    private readonly AppDbContext _db;

    public ProductSupplierService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<ProductSupplierDTO>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default)
    {
        var items = await _db.ProductSuppliers
            .AsNoTracking()
            .Include(ps => ps.Product)
            .Include(ps => ps.Supplier)
            .Where(ps => ps.Product.WarehouseId == warehouseId && ps.Supplier.WarehouseId == warehouseId)
            .OrderBy(ps => ps.Product.Name)
            .ThenBy(ps => ps.Supplier.Name)
            .ToListAsync(cancellationToken);

        return items.Select(Map);
    }

    public async Task<IEnumerable<ProductSupplierDTO>> GetByProductIdAsync(int warehouseId, int productId, CancellationToken cancellationToken = default)
    {
        var items = await _db.ProductSuppliers
            .AsNoTracking()
            .Include(ps => ps.Product)
            .Include(ps => ps.Supplier)
            .Where(ps => ps.ProductId == productId && ps.Product.WarehouseId == warehouseId && ps.Supplier.WarehouseId == warehouseId)
            .OrderBy(ps => ps.Supplier.Name)
            .ToListAsync(cancellationToken);

        return items.Select(Map);
    }

    public async Task<IEnumerable<ProductSupplierDTO>> GetBySupplierIdAsync(int warehouseId, int supplierId, CancellationToken cancellationToken = default)
    {
        var items = await _db.ProductSuppliers
            .AsNoTracking()
            .Include(ps => ps.Product)
            .Include(ps => ps.Supplier)
            .Where(ps => ps.SupplierId == supplierId && ps.Product.WarehouseId == warehouseId && ps.Supplier.WarehouseId == warehouseId)
            .OrderBy(ps => ps.Product.Name)
            .ToListAsync(cancellationToken);

        return items.Select(Map);
    }

    public async Task<ProductSupplierDTO?> GetByIdAsync(int warehouseId, int productId, int supplierId, CancellationToken cancellationToken = default)
    {
        var item = await _db.ProductSuppliers
            .AsNoTracking()
            .Include(ps => ps.Product)
            .Include(ps => ps.Supplier)
            .FirstOrDefaultAsync(
                ps => ps.ProductId == productId
                      && ps.SupplierId == supplierId
                      && ps.Product.WarehouseId == warehouseId
                      && ps.Supplier.WarehouseId == warehouseId,
                cancellationToken);

        return item == null ? null : Map(item);
    }

    public async Task<ProductSupplierDTO> UpsertAsync(int warehouseId, ProductSupplierUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var product = await _db.Products.FirstOrDefaultAsync(p => p.ProductId == model.ProductId && p.WarehouseId == warehouseId, cancellationToken);
        if (product == null) throw new InvalidOperationException("Product not found in warehouse.");

        var supplier = await _db.Suppliers.FirstOrDefaultAsync(s => s.SupplierId == model.SupplierId && s.WarehouseId == warehouseId, cancellationToken);
        if (supplier == null) throw new InvalidOperationException("Supplier not found in warehouse.");

        var existing = await _db.ProductSuppliers
            .Include(ps => ps.Product)
            .Include(ps => ps.Supplier)
            .FirstOrDefaultAsync(ps => ps.ProductId == model.ProductId && ps.SupplierId == model.SupplierId, cancellationToken);

        if (existing == null)
        {
            var entity = new ProductSupplier
            {
                ProductId = model.ProductId,
                SupplierId = model.SupplierId,
                Type = model.Type,
                Price = model.Price
            };

            _db.ProductSuppliers.Add(entity);
            await _db.SaveChangesAsync(cancellationToken);

            entity.Product = product;
            entity.Supplier = supplier;
            return Map(entity);
        }

        existing.Type = model.Type;
        existing.Price = model.Price;
        await _db.SaveChangesAsync(cancellationToken);
        return Map(existing);
    }

    public async Task<bool> DeleteAsync(int warehouseId, int productId, int supplierId, CancellationToken cancellationToken = default)
    {
        var entity = await _db.ProductSuppliers
            .Include(ps => ps.Product)
            .Include(ps => ps.Supplier)
            .FirstOrDefaultAsync(
                ps => ps.ProductId == productId
                      && ps.SupplierId == supplierId
                      && ps.Product.WarehouseId == warehouseId
                      && ps.Supplier.WarehouseId == warehouseId,
                cancellationToken);

        if (entity == null) return false;

        _db.ProductSuppliers.Remove(entity);
        await _db.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static ProductSupplierDTO Map(ProductSupplier ps) => new()
    {
        ProductId = ps.ProductId,
        SupplierId = ps.SupplierId,
        Product = ps.Product?.Name ?? string.Empty,
        Supplier = ps.Supplier?.Name ?? string.Empty,
        Type = ps.Type,
        Price = ps.Price
    };
}

