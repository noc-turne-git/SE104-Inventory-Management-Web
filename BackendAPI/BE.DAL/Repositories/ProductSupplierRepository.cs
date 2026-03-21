using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.BE.DAL.Repositories;
public class ProductSupplierRepository : IProductSupplierRepository
{
    private readonly AppDbContext _context;

    public ProductSupplierRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ProductSupplier> AddAsync(ProductSupplier ps)
    {
        await _context.ProductSuppliers.AddAsync(ps);
        await _context.SaveChangesAsync();
        return ps;
    }

    public async Task UpdateAsync(ProductSupplier ps)
    {
        var existing = await _context.ProductSuppliers.FindAsync(ps.ProductId, ps.SupplierId);
        if (existing == null) return;

        _context.Entry(existing).CurrentValues.SetValues(ps);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(string productId, string supplierId)
    {
        var entity = await _context.ProductSuppliers.FindAsync(productId, supplierId);
        if (entity == null) return;

        _context.ProductSuppliers.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<ProductSupplier>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.ProductSuppliers.ToListAsync(cancellationToken);
    }

    public async Task<ProductSupplier?> GetByIdAsync(string productId, string supplierId, CancellationToken cancellationToken = default)
    {
        return await _context.ProductSuppliers.FindAsync(new object[] { productId, supplierId }, cancellationToken);
    }

    public async Task<IEnumerable<ProductSupplier>> GetByProductIdAsync(string productId)
    {
        return await _context.ProductSuppliers
            .Where(x => x.ProductId == productId)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProductSupplier>> GetBySupplierIdAsync(string supplierId)
    {
        return await _context.ProductSuppliers
            .Where(x => x.SupplierId == supplierId)
            .ToListAsync();
    }

    public async Task<bool> ExistsAsync(string productId, string supplierId, CancellationToken cancellationToken = default)
    {
        return await _context.ProductSuppliers
            .AnyAsync(x => x.ProductId == productId && x.SupplierId == supplierId, cancellationToken);
    }
}