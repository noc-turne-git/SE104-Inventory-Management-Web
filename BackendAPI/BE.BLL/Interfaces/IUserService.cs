namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
public interface IUserService
{
    Task<User> GetUserAsync(string identifier, bool isId = false);
    Task<bool> UpdateUserAsync(User user);
    
    Task AddUserAsync(User user);
}