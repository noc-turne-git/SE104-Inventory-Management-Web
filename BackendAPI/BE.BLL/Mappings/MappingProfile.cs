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
        CreateMap<Product, ProductDTO>();
        CreateMap<ProductDTO, Product>();
        CreateMap<UserDTO, User>();
        CreateMap<User, UserDTO>();
        CreateMap<CreateWarehouseDTO,Warehouse>();
        
    }
}