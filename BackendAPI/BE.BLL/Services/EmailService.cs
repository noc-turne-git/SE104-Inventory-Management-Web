namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;
using System.Security.Cryptography;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly IOTPRepository _OTPRepository;
    private readonly ITokenService _tokenService;
    private readonly IRepository<VerifyEmailToken> _verifyEmailTokenRepository;

    public EmailService(
        IConfiguration configuration,
        IOTPRepository OTPRepository,
        ITokenService tokenService,
        IRepository<VerifyEmailToken> verifyEmailTokenRepository)
    {
        _configuration = configuration;
        _OTPRepository = OTPRepository;
        _tokenService = tokenService;
        _verifyEmailTokenRepository = verifyEmailTokenRepository;
    }

    public Task<string> GenerateOtpAsync()
    {
        int otp = RandomNumberGenerator.GetInt32(100000, 999999);
        return Task.FromResult(otp.ToString());
    }

    private async Task saveOtpAsync(string email, string otpCode)
    {
        await _OTPRepository.InvalidateActiveByEmailAsync(email);

        var OTP = new OTP
        {
            Code = otpCode,
            Email = email,
            CreatedAt = DateTime.UtcNow,
            Expiration = DateTime.UtcNow.AddMinutes(15),
            IsUsed = false
        };
        await _OTPRepository.AddAsync(OTP);
    }

    public async Task SendResetPasswordEmailAsync(string toEmail)
    {
        var otpCode = await GenerateOtpAsync();

        var emailMessage = new EmailMessageDTO
        {
            ToEmail = toEmail,
            Subject = "Khôi phục mật khẩu tài khoản của bạn",
            Body = $@"
            <div style='font-family: sans-serif; text-align: center;'>
                <h3>Mã xác thực của bạn là:</h3>
                <h1 style='color: #007bff; letter-spacing: 5px;'>{otpCode}</h1>
                <p>Mã này có hiệu lực trong <b>15 phút</b>.</p>
                <p>Vui lòng không cung cấp mã này cho bất kỳ ai.</p>
            </div>"
        };

        await saveOtpAsync(toEmail, otpCode);
        await SendEmailAsync(emailMessage);
    }

    public async Task SendConfirmationEmailAsync(string toEmail, int UserId)
    {
        string token = _tokenService.GenerateRandomStringToken();

        string frontendUrl = _configuration["Frontend:VerifyEmailUrl"] ?? "http://localhost:5173/verify-email";
        string confirmationLink = $"{frontendUrl}?token={token}&email={toEmail}";
    
        var emailMessage = new EmailMessageDTO
        {
            ToEmail = toEmail,
            Subject = "Xác nhận tài khoản của bạn",
            Body = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; text-align: center;'>
                    <h2 style='color: #333;'>Chào mừng bạn!</h2>
                    <p>Cảm ơn bạn đã đăng ký. Vui lòng nhấn vào nút bên dưới để xác thực tài khoản:</p>
                    <div style='margin: 30px 0;'>
                        <a href='{confirmationLink}'
                        style='background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>
                        Xác nhận ngay
                        </a>
                    </div>
                    <p style='font-size: 12px; color: #777;'>Link này có hiệu lực trong 24 giờ.</p>
                    <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>
                    <p style='font-size: 11px; color: #999;'>Nếu nút không hoạt động, bạn có thể copy link này: <br> {confirmationLink}</p>
                </div>"
        };

        var existingTokens = await _verifyEmailTokenRepository.GetAsync(t => t.Email == toEmail && t.UserId == UserId);
        foreach (var existing in existingTokens)
        {
            await _verifyEmailTokenRepository.DeleteAsync(existing.VerifyEmailTokenId);
        }

        var verifyEmailToken = new VerifyEmailToken
        {
            Token = token,
            Email = toEmail,
            UserId = UserId,
            ExpiresAt = DateTime.UtcNow.AddHours(24)
        };
        await _verifyEmailTokenRepository.AddAsync(verifyEmailToken);

        await SendEmailAsync(emailMessage);
    }

    public async Task SendInvitationEmailAsync(string toEmail, string warehouseName)
    {
        var emailMessage = new EmailMessageDTO
        {
            ToEmail = toEmail,
            Subject = "Warehouse Staff Invitation",
            Body = $@"
            <div style='font-family: sans-serif; text-align: center;'>
                <h3>Bạn đã được mời tham gia kho hàng:</h3>
                <h1 style='color: #007bff;'>{warehouseName}</h1>
                <p>Vui lòng đăng ký tài khoản để chấp nhận lời mời.</p>
            </div>"
        };

        await SendEmailAsync(emailMessage);
    }

    public async Task SendEmailAsync(EmailMessageDTO emailMessage)
    {
        var displayName = _configuration["Email:DisplayName"] ?? "Stockify";
        var fromAddress = _configuration["Email:FromAddress"] ?? throw new InvalidOperationException("Email:FromAddress is missing.");
        var smtpHost = _configuration["Email:SmtpHost"] ?? throw new InvalidOperationException("Email:SmtpHost is missing.");
        var smtpPort = _configuration.GetValue<int?>("Email:SmtpPort") ?? 587;
        var username = _configuration["Email:Username"] ?? throw new InvalidOperationException("Email:Username is missing.");
        var password = _configuration["Email:Password"] ?? throw new InvalidOperationException("Email:Password is missing.");
        var useStartTls = _configuration.GetValue<bool?>("Email:UseStartTls") ?? true;

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(displayName, fromAddress));
        message.To.Add(new MailboxAddress("", emailMessage.ToEmail));
        message.Subject = emailMessage.Subject;
        message.Body = new TextPart("html") { Text = emailMessage.Body };

        using var client = new SmtpClient();
        await client.ConnectAsync(
            smtpHost,
            smtpPort,
            useStartTls ? MailKit.Security.SecureSocketOptions.StartTls : MailKit.Security.SecureSocketOptions.Auto);
        await client.AuthenticateAsync(username, password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}

