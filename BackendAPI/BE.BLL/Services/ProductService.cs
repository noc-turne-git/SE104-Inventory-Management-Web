namespace BackendAPI.BE.BLL.Services;

using AutoMapper;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.DAL.Repositories;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;
    
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ProductService(IProductRepository productRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        _productRepository = productRepository;
        _mapper = mapper;        
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<IEnumerable<ProductDTO>> GetAllProductsAsync()
    {
        
        var httpUser = _httpContextAccessor.HttpContext?.User;
        var products = await _productRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<ProductDTO>>(products);
    }

    public async Task<bool> AddProductAsync(ProductDTO productDTO)
    {
        try
        {
            var product = _mapper.Map<Product>(productDTO);
            await _productRepository.AddAsync(product);
            return true;
        }
        catch (Exception ex)
        {
            // Log the exception (ex) as needed
            return false;
        }
    }
}
