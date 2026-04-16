namespace BackendAPI.BE.BLL.Services;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.API.DTO;
using AutoMapper;
using BackendAPI.BE.DAL.Entities;
using BCrypt.Net;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Repositories;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Hangfire;

public class AuthService: IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IOTPRepository _OTPRepository;
    private readonly IRepository<PasswordResetToken> _PasswordResetTokenRepository;
    private readonly IRepository<VerifyEmailToken> _verifyEmailTokenRepository;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly ITokenService _tokenService;
    private readonly IRepository<RefreshToken> _refreshTokenRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;
    //private readonly ICacheService<User> _cacheService;
    public AuthService(
        IUserRepository userRepository,
        IOTPRepository OTPRepository,
        IRepository<PasswordResetToken> PasswordResetTokenRepository,
        IRepository<VerifyEmailToken> verifyEmailTokenRepository,
        IMapper mapper,
        IEmailService emailService,
        ITokenService tokenService,
        IRepository<RefreshToken> refreshTokenRepository,
        IHttpContextAccessor httpContextAccessor)
    {
        _userRepository = userRepository;
        _OTPRepository = OTPRepository;
        _PasswordResetTokenRepository = PasswordResetTokenRepository;
        _verifyEmailTokenRepository = verifyEmailTokenRepository;
        _mapper = mapper;
        _emailService = emailService;
        _tokenService = tokenService;
        _refreshTokenRepository = refreshTokenRepository;
        _httpContextAccessor = httpContextAccessor;
        //_cacheService = cacheService;

        //_configuration = configuration;
    }
    public async Task<TokenDTO> LoginAsync(LoginDTO model)
    {
        //string cacheKey = $"user:profile:{model.Username.ToLower()}";
        var user = await _userRepository.GetByEmailAsync(model.Email);
        if (user==null) return null;

        if (!BCrypt.Verify(model.Password, user.PasswordHash))
            return null; // Invalid password
        var userDTO = _mapper.Map<UserDTO>(user);
        string accessToken = _tokenService.CreateAccessToken(userDTO);
        string refreshToken = _tokenService.GenerateRandomStringToken();
        var refreshTokenEntity = new RefreshToken
        {
            Token = refreshToken,
            UserId = user.UserId,
            ExpiresAt = DateTime.UtcNow.AddDays(7) // Set expiration as needed
        };
        await _refreshTokenRepository.AddAsync(refreshTokenEntity);

        return new TokenDTO { AccessToken = accessToken, RefreshToken = refreshToken };
    }

    public async Task<bool> SignupAsync(SignupDTO model)
    {
        if (await _userRepository.GetByEmailAsync(model.Email) != null)
            return false; // Email already exists        
        
        if(model.Password != model.ConfirmPassword)
            return false; // Password and Confirm Password do not match
        
        var user = _mapper.Map<User>(model);
        user.PasswordHash = BCrypt.HashPassword(model.Password);  
        user = await _userRepository.AddAsync(user);

        //await _emailService.SendConfirmationEmailAsync(model.Email, user.UserId);   
        BackgroundJob.Enqueue<IEmailService>(x => x.SendConfirmationEmailAsync(model.Email, user.UserId));

        return true;
    }

    public async Task<bool> VerifyEmailAsync(VerifyEmailDTO model)
    {
        if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Token))
            return false;

        var tokens = await _verifyEmailTokenRepository.GetAsync(t =>
            t.Email == model.Email && t.Token == model.Token);

        var tokenEntity = tokens.FirstOrDefault();
        if (tokenEntity == null)
            return false;

        if (tokenEntity.ExpiresAt < DateTime.UtcNow)
            return false;

        var user = await _userRepository.GetByIdAsync(tokenEntity.UserId);
        if (user == null || !string.Equals(user.Email, model.Email, StringComparison.OrdinalIgnoreCase))
            return false;
        Console.WriteLine($"Đang xác thực cho: {model.Email} lúc {DateTime.Now.Ticks}");
        if (!user.IsVerified)
        {
            user.IsVerified = true;
            await _userRepository.UpdateAsync(user);
        }

        await _verifyEmailTokenRepository.DeleteAsync(tokenEntity.VerifyEmailTokenId);
        Console.WriteLine($"Đã xóa token cho email: {model.Email} lúc {DateTime.Now.Ticks}");
        return true;
    }

    public async Task<bool> ForgotPasswordAsync(ForgotPasswordDTO model)
    {
        var user = await _userRepository.GetByEmailAsync(model.Email);
        if (user == null)
            return false; // Email not found
        await _emailService.SendResetPasswordEmailAsync(model.Email);

        return true;
    }

    public async Task<bool> verifyOtpAsync(string otp, string email) {
        var otpEntity = await _OTPRepository.GetByEmailAsync(email);
        if(otpEntity == null || otpEntity.Expiration < DateTime.UtcNow || otpEntity.IsUsed) return false;
        if(otpEntity.Code != otp) return false;
        await _OTPRepository.MarkAsUsedAsync(otpEntity.Id);

        return true;
    }

    public async Task<String> createPasswordResetTokenAsync(string email) {
        var resetPasswordToken = _tokenService.GenerateRandomStringToken();
        var tokenEntity = new PasswordResetToken
        {
            Token = resetPasswordToken,
            Email = email,
            CreatedAt = DateTime.UtcNow,
            Expiration = DateTime.UtcNow.AddHours(1),
             
        };
        await _PasswordResetTokenRepository.AddAsync(tokenEntity);
        return resetPasswordToken;
    }



    public async Task<bool> ResetPasswordAsync(ChangePasswordDTO model)
    {
        if(model.newPass != model.confirmNewPass) return false;
        var tokens = await _PasswordResetTokenRepository.GetAsync(t => t.Token == model.resetPassToken); 

        var tokenEntity = tokens.FirstOrDefault(t => t.Token == model.resetPassToken);

        if(tokenEntity == null || tokenEntity.Expiration < DateTime.UtcNow) return false;

        var user = await _userRepository.GetByEmailAsync(tokenEntity.Email);
        if(user == null) return false;

        user.PasswordHash = BCrypt.HashPassword(model.newPass);
        await _userRepository.UpdateAsync(user);

        await _PasswordResetTokenRepository.DeleteAsync(tokenEntity.Id);
        return true;
    }

    

    public async Task<TokenDTO> RefreshTokenAsync(RefreshTokenRequestDTO model)
    {
        // 1. Lấy principal từ token cũ (đã hết hạn)
        var principal = _tokenService.GetPrincipalFromExpiredToken(model.accessToken);

        var userid = principal.FindFirstValue("sub");

        // 2. Kiểm tra RefreshToken trong Database xem có khớp với User này không
        var tokens = await _refreshTokenRepository.GetAsync(rt => rt.Token == model.RefreshToken);
        
        
        
        var user = await _userRepository.GetByIdAsync(int.Parse(userid));
        if (tokens == null || !tokens.Any() || user == null)
            return null; // Refresh token không tồn tại
        
        var userDTO = _mapper.Map<UserDTO>(user);

        var existingToken = tokens.FirstOrDefault(rt => rt.UserId == user.UserId && rt.Token == model.RefreshToken);
        // 3. Tạo cặp Token mới
        var newAccessToken = _tokenService.CreateAccessToken(userDTO);
        var newRefreshToken = _tokenService.GenerateRandomStringToken();

        // 4. Lưu lại Refresh Token mới vào DB
        existingToken.Token = newRefreshToken;
        existingToken.UserId = user.UserId;
        existingToken.ExpiresAt = DateTime.UtcNow.AddDays(7);
        await _refreshTokenRepository.UpdateAsync(existingToken);

        return new TokenDTO { 
            AccessToken = newAccessToken, 
            RefreshToken = newRefreshToken 
        };
    }

}
