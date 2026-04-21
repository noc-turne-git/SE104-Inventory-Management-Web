namespace BackendAPI.BE.BLL.Interfaces;
using UserModel = BackendAPI.BE.API.DTO.UserDTO;
using System.Security.Claims;
public interface ITokenService
{
    string CreateAccessToken(UserModel user);
    string GenerateRandomStringToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}