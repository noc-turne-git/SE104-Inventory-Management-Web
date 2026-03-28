namespace BackendAPI.Controllers;

using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;


    public AuthController(IMapper mapper, IUserRepository userRepository
        ,IEmailService emailService, IRepository<PasswordResetToken> PasswordResetTokenRepository
        ,ITokenService tokenService, IRepository<RefreshToken> refreshTokenRepository
        ,IOTPRepository OTPRepository, IHttpContextAccessor httpContextAccessor)
    {        
        _authService = new AuthService(userRepository, OTPRepository
            , PasswordResetTokenRepository, mapper, emailService, tokenService
            , refreshTokenRepository, httpContextAccessor);        
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO model)
    {
        var result = await _authService.LoginAsync(model);
        if (result == null)
            return Unauthorized(new { Success = false, Message = "Invalid username or password." });
        return Ok(new { Success = true, AccessToken = result.AccessToken, RefreshToken = result.RefreshToken });
    }   

    [HttpPost("signup-manager")]
    public async Task<IActionResult> Signup(SignupDTO model)
    {
        var result = await _authService.SignupManagerAsync(model);
        if (!result)
            return BadRequest(new { Success = false, Message = "Username already exists." });
        return Ok(new { Success = result });
    }


 
    // [HttpPost("Verify-email")]
    // public async Task<IActionResult> verifyEmail()


    [HttpPost("ForgotPassword")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO model)
    {
        var result = await _authService.ForgotPasswordAsync(model);
        if (!result)
            return BadRequest(new { Success = false, Message = "Email not found." });
        return Ok(new { Success = true });
    }

    [HttpPost("forgotPassword/verify-otp")]
    public async Task<IActionResult> VerifyOtp(VerifyOtpDTO model)
    {
        var result = await _authService.verifyOtpAsync(model.Otp, model.Email);
        if (!result)
            return BadRequest(new { Success = false, Message = "Invalid OTP." });

        var resetToken = await _authService.createPasswordResetTokenAsync(model.Email);

        return Ok(new 
        {
            Success = true,
            ResetToken = resetToken 
        });
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordDTO model)
    {
        var result = await _authService.ResetPasswordAsync(model);
        if (!result)
            return BadRequest(new { Success = false, Message = "Invalid reset token." });
        return Ok(new { Success = true });
    }
 
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken(RefreshTokenRequestDTO model)
    {
        var result = await _authService.RefreshTokenAsync(model);
        if (result == null)
            return Unauthorized(new { Success = false, Message = "Invalid refresh token." });
        
        return Ok(new { Success = true, AccessToken = result.AccessToken, RefreshToken = result.RefreshToken });
    }
}