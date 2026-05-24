using AutoMapper;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.API.DTO;
namespace BackendAPI.BE.BLL.Mappings;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<TestItem, TestItemDTO>();
        CreateMap<TestItemDTO, TestItem>();
        CreateMap<SignupDTO, User>();
        CreateMap<User, SignupDTO>();
        CreateMap<Product, ProductDTO>()
            .ForMember(d => d.Sku, opt => opt.NullSubstitute(string.Empty));
        // .ForMember(...): là chỉnh riêng từng field
        // d => d.Sku: lấy property Sku của object đích, d : object còn d.Sku: property
        // opt là option/config cho property đó.
        // ==> chỉnh d.Sku === null thanh === ""
        CreateMap<ProductDTO, Product>();
        CreateMap<UserDTO, User>();
        CreateMap<User, UserDTO>();
        CreateMap<CreateWarehouseDTO,Warehouse>();
        
    }
}
