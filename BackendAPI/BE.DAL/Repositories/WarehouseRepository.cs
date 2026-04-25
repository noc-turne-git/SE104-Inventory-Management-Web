namespace BackendAPI.BE.DAL.Repositories;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

public class WarehouseRepository : Repository<Warehouse>, IWarehouseRepository
{
    // Implementation details
    public WarehouseRepository(AppDbContext context) : base(context)
    {
        
    }
    

    public async Task<int> GetProductCountAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Products
            .CountAsync(p => p.WarehouseId == id, cancellationToken);
    }
}