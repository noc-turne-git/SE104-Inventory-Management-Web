using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BackendAPI.BE.BLL.Interfaces;
using System.Security.Cryptography;
using UserModel = BackendAPI.BE.API.DTO.UserDTO;


namespace BackendAPI.BE.BLL.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }
    public string CreateAccessToken(UserModel user)
    {
        // 1. Định nghĩa thông tin người dùng (Claims)
        var claims = new List<Claim>
        {
            //new Claim(JwtRegisteredClaimNames.Email, user.Email),
            // Sử dụng ClaimTypes.NameIdentifier cho ID để đồng bộ với hệ thống .NET
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), 
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()), // Giữ lại sub nếu muốn
            //new Claim(ClaimTypes.Role, user.Role ?? "") 
            
        };

        // 2. Lấy Key từ cấu hình và tạo Key bảo mật
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // 3. Thiết lập thông số Token
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddMinutes(3), // Token hết hạn sau 1 ngày
            SigningCredentials = creds,
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"]
        };

        // 4. Tạo và trả về chuỗi Token
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
  

    public string GenerateRandomStringToken()
    {
        var randomBytes = new byte[32]; 
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);

        // 1. Tạo Base64 bình thường
        string base64 = Convert.ToBase64String(randomBytes);

        // 2. Biến nó thành URL Safe
        return base64.Replace('+', '-')   // Thay + bằng -
                    .Replace('/', '_')   // Thay / bằng _
                    .TrimEnd('=');       // Xóa dấu = ở cuối
    }

    public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false, 
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"])),
            ValidateLifetime = false 
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

       
        return principal;
    }
}
