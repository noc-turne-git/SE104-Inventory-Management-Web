namespace BackendAPI.BE.BLL.Services;

using AutoMapper;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;

public class ProductService : IProductService
{
    private readonly IRepository<Product> _products;
    private readonly IMapper _mapper;
    
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ProductService(IRepository<Product> products, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _products = products;
        _mapper = mapper;        
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<IEnumerable<ProductDTO>> GetAllProductsAsync()
    {
        
        var httpUser = _httpContextAccessor.HttpContext?.User;
        var products = await _products.GetAllAsync();
        var dtos = _mapper.Map<List<ProductDTO>>(products);
        foreach (var dto in dtos)
        {
            dto.Status = GetStatus(dto.StockQuantity);
        }
        return dtos;
    }

    public async Task<bool> AddProductAsync(ProductDTO productDTO)
    {
        try
        {
            var product = _mapper.Map<Product>(productDTO);
            await _products.AddAsync(product);
            return true;
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return false;
        }
    }

    private static string GetStatus(int stockQuantity)
    {
        if (stockQuantity <= 0) return "out of stock";
        if (stockQuantity <= 20) return "low stock";
        return "in stock";
    }

    public Task<IEnumerable<Product>> GetAllByWarehouseAsync(int warehouseId, CancellationToken cancellationToken = default)
        => _products.GetAsync(p => p.WarehouseId == warehouseId, cancellationToken);

    public async Task<Product?> GetByIdAsync(int warehouseId, int productId, CancellationToken cancellationToken = default)
    {
        var product = await _products.GetByIdAsync(productId, cancellationToken);
        return product != null && product.WarehouseId == warehouseId ? product : null;
    }

    public async Task<Product> CreateAsync(int warehouseId, ProductDTO productDTO, CancellationToken cancellationToken = default)
    {
        var entity = _mapper.Map<Product>(productDTO);
        entity.WarehouseId = warehouseId;

        await _products.AddAsync(entity, cancellationToken);
        return entity;
    }

    public async Task<bool> DeleteAsync(int warehouseId, int productId, CancellationToken cancellationToken = default)
    {
        var product = await _products.GetByIdAsync(productId, cancellationToken);
        if (product == null || product.WarehouseId != warehouseId) return false;

        return await _products.DeleteAsync(productId, cancellationToken);
    }

    public async Task<IEnumerable<Product>> SearchAsync(int warehouseId, string? query, int limit = 20, CancellationToken cancellationToken = default)
    {
        limit = Math.Clamp(limit, 1, 100);
        query = query?.Trim();

        IEnumerable<Product> items;
        if (string.IsNullOrWhiteSpace(query))
        {
            items = await _products.GetAsync(p => p.WarehouseId == warehouseId, cancellationToken);
        }
        else
        {
            items = await _products.GetAsync(
                p => p.WarehouseId == warehouseId
                     && (p.Name.Contains(query)
                         || p.Category.Contains(query)
                         || p.Description.Contains(query)),
                cancellationToken);
        }

        return items
            .OrderBy(p => p.Name)
            .ThenBy(p => p.ProductId)
            .Take(limit);
    }
}
