namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.DAL.Entities;

public interface IProductService 
{
    // Define methods for product-related operations, e.g.:
    Task<IEnumerable<ProductDTO>> GetAllProductsAsync();
    Task<bool> AddProductAsync(ProductDTO productDTO);

    Task<IEnumerable<Product>> GetAllByWarehouseAsync(int warehouseId, CancellationToken cancellationToken = default);
    Task<Product?> GetByIdAsync(int warehouseId, int productId, CancellationToken cancellationToken = default);
    Task<Product> CreateAsync(int warehouseId, ProductDTO productDTO, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int warehouseId, int productId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Product>> SearchAsync(int warehouseId, string? query, int limit = 20, CancellationToken cancellationToken = default);
    // Task<ProductDTO> GetProductByIdAsync(int id);
    // Task<ProductDTO> CreateProductAsync(ProductCreateDTO model);
    // Task UpdateProductAsync(int id, ProductUpdateDTO model);
    // Task DeleteProductAsync(int id);
}
