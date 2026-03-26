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

public class AuthService: IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IOTPRepository _OTPRepository;
    private readonly IRepository<PasswordResetToken> _PasswordResetTokenRepository;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly ITokenService _tokenService;
    private readonly IRepository<RefreshToken> _refreshTokenRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;
    //private readonly IConfiguration _configuration;
    public AuthService(IUserRepository userRepository, IOTPRepository OTPRepository, IRepository<PasswordResetToken> PasswordResetTokenRepository,
     IMapper mapper, IEmailService emailService, ITokenService tokenService, IRepository<RefreshToken> refreshTokenRepository
     , IHttpContextAccessor httpContextAccessor)
    {
        _userRepository = userRepository;
        _OTPRepository = OTPRepository;
        _PasswordResetTokenRepository = PasswordResetTokenRepository;
        _mapper = mapper;
        _emailService = emailService;
        _tokenService = tokenService;
        _refreshTokenRepository = refreshTokenRepository;
        _httpContextAccessor = httpContextAccessor;
        //_configuration = configuration;
    }
    public async Task<TokenDTO> LoginAsync(LoginDTO model)
    {
        var user = await _userRepository.GetByUsernameAsync(model.Username);
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

    public async Task<bool> SignupManagerAsync(SignupDTO model)
    {
        if (await _userRepository.GetByUsernameAsync(model.Username) != null)
            return false; // Username already exists

        

        var user = _mapper.Map<User>(model);
        user.PasswordHash = BCrypt.HashPassword(model.Password);
        user.Role = "Manager"; // Set the role for manager

        await _userRepository.AddAsync(user);
        return true;
    }

    // public async Task<bool> SignupWarehouseStaffAsync(SignupDTO model)
    // {
    //     if (await _userRepository.GetByUsernameAsync(model.Username) != null)
    //         return false; // Username already exists

    //     var user = _mapper.Map<User>(model);
    //     user.PasswordHash = BCrypt.HashPassword(model.Password);
    //     user.Role = "WarehouseStaff"; // Set the role for warehouse staff

    //     await _userRepository.AddAsync(user);
    //     return true;
    // }

    public async Task<bool> ForgotPasswordAsync(ForgotPasswordDTO model)
    {
        var user = await _userRepository.GetByEmailAsync(model.Email);
        if (user == null)
            return false; // Email not found
        var otpCode = await _emailService.GenerateOtpAsync();

        await _emailService.SendResetPasswordEmailAsync(model.Email, otpCode);
        var OTP = new OTP
        {
            Code = otpCode,
            Email = model.Email,
            CreatedAt = DateTime.UtcNow,
            Expiration = DateTime.UtcNow.AddMinutes(15), // OTP valid for 15 minutes
            IsUsed = false
        };
        await _OTPRepository.AddAsync(OTP);


        return true;
    }

    public async Task<string> verifyOtpAsync(string otp, string email) {
        var otpEntity = await _OTPRepository.GetByEmailAsync(email);
        if(otpEntity == null || otpEntity.Expiration < DateTime.UtcNow || otpEntity.IsUsed) return null;
        if(otpEntity.Code != otp) return null;

        var resetPasswordToken = _tokenService.GenerateRandomStringToken();
        var tokenEntity = new PasswordResetToken
        {
            Token = resetPasswordToken,
            Email = email,
            CreatedAt = DateTime.UtcNow,
            Expiration = DateTime.UtcNow.AddHours(1),
             
        };
        await _PasswordResetTokenRepository.AddAsync(tokenEntity);
        await _OTPRepository.MarkAsUsedAsync(otpEntity.Id);
        return resetPasswordToken;
    }

    public async Task<bool> ResetPasswordAsync(ChangePasswordDTO model)
    {
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

//     public async Task<TokenDTO> RefreshTokenAsync(RefreshTokenRequestDTO model)
//     {
//         var tokens = await _refreshTokenRepository.GetAsync(rt => rt.Token == model.RefreshToken);
//         var existingToken = tokens.FirstOrDefault(rt => rt.Token == model.RefreshToken);
//         if (existingToken == null || existingToken.ExpiresAt < DateTime.UtcNow)
//             return null; // Invalid or expired refresh token

//         var test = new ClaimsIdentity();
//         var httpUser = _httpContextAccessor.HttpContext?.User;

//         var userIdClaim = httpUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;
//         var allClaims = httpUser.Claims.Select(c => $"{c.Type}: {c.Value}").ToList();
// // Đặt breakpoint ở đây để xem danh sách claims

//         var user = await _userRepository.GetByIdAsync(int.Parse(userIdClaim));
       

//         if (user == null)
//             return null; // User not found

//         var userDTO = _mapper.Map<UserDTO>(user);

//         TokenDTO tokenDTO = new TokenDTO
//         {
//             AccessToken = _tokenService.CreateAccessToken(userDTO),
//             RefreshToken = _tokenService.GenerateRandomStringToken()
//         };

//         existingToken.Token = tokenDTO.RefreshToken;
//         existingToken.ExpiresAt = DateTime.UtcNow.AddDays(7); // Extend expiration
//         await _refreshTokenRepository.UpdateAsync(existingToken);

//         return tokenDTO;
//     }

}
