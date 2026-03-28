namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
public interface IAuthService
{
    Task<TokenDTO> LoginAsync(LoginDTO model);
    Task<bool> SignupAsync(SignupDTO model);


    Task<bool> ForgotPasswordAsync(ForgotPasswordDTO model);
    Task<string> createPasswordResetTokenAsync(string email); 
    Task<bool> verifyOtpAsync(string otp, string email);
    Task<bool> ResetPasswordAsync(ChangePasswordDTO model);
    Task<TokenDTO> RefreshTokenAsync(RefreshTokenRequestDTO model);
}