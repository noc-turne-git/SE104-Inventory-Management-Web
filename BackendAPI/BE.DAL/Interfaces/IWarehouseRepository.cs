namespace BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.DAL.Entities;
public interface IWarehouseRepository : IRepository<Warehouse>
{
    Task<int> GetProductCountAsync(int id, CancellationToken cancellationToken = default);
    //Task<IEnumerable<Warehouse>> ListWarehousesAsync(CancellationToken cancellationToken = default);
}