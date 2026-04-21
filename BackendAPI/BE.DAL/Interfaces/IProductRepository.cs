namespace BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.DAL.Entities;
public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetTop10Async();
}