namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.DAL.Entities;

public interface IProductService 
{
    // Define methods for product-related operations, e.g.:
    Task<IEnumerable<ProductDTO>> GetAllProductsAsync();
    Task<bool> AddProductAsync(ProductDTO productDTO);
    // Task<ProductDTO> GetProductByIdAsync(int id);
    // Task<ProductDTO> CreateProductAsync(ProductCreateDTO model);
    // Task UpdateProductAsync(int id, ProductUpdateDTO model);
    // Task DeleteProductAsync(int id);
}