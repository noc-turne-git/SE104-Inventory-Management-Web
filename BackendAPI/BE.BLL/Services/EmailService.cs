namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MimeKit;
using System.Security.Cryptography;

public class EmailService : IEmailService
{
    private readonly IOTPRepository _OTPRepository;
    private readonly ITokenService _tokenService;
    private readonly IRepository<VerifyEmailToken> _verifyEmailTokenRepository;
    //private readonly IRepository<InviteToken> _inviteTokenRepository;
    private readonly IRepository<Warehouse> _warehouseRepository;

    public EmailService(
        IOTPRepository OTPRepository,
        ITokenService tokenService,
        IRepository<VerifyEmailToken> verifyEmailTokenRepository        
        ,IRepository<Warehouse> warehouseRepository)
    {
        _OTPRepository = OTPRepository;
        _tokenService = tokenService;
        _verifyEmailTokenRepository = verifyEmailTokenRepository;       
        _warehouseRepository= warehouseRepository;
    }

    public Task<string> GenerateOtpAsync()
    {
        int otp = RandomNumberGenerator.GetInt32(100000, 999999);
        return Task.FromResult(otp.ToString());
    }

    private async Task saveOtpAsync(string email, string otpCode)
    {
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
            Subject = "Khôi phục mật khẩu tài khoản Staff",
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

        string frontendUrl = "http://localhost:5173/verify-email";
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

    // public async Task SendInvitationEmailAsync(string toEmail, int warehouseId)
    // {
        
    //     string token = _tokenService.GenerateRandomStringToken();

    //     string frontendUrl = "http://localhost:5173/join-warehouse";
    //     string JoinLink = $"{frontendUrl}?token={token}&email={toEmail}";

    //     var warehouse = await _warehouseRepository.GetByIdAsync(warehouseId);

    //     var emailMessage = new EmailMessageDTO
    //     {
    //         ToEmail = toEmail,
    //         Subject = "Warehouse Staff Invitation",
    //         Body = $@"
    //             <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; text-align: center;'>
    //                 <h2 style='color: #333;'>Bạn đã được mời tham gia kho hàng {warehouse.WarehouseId} - {warehouse.Name}.</h2>
    //                 <p>Vui lòng nhấn vào nút bên dưới để xác tham gia kho hàng: </p>
    //                 <div style='margin: 30px 0;'>
    //                     <a href='{JoinLink}'
    //                     style='background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>
    //                     Tham gia
    //                     </a>
    //                 </div>
    //                 <p style='font-size: 12px; color: #777;'>Link này có hiệu lực trong 24 giờ.</p>
    //                 <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>
    //                 <p style='font-size: 11px; color: #999;'>Nếu nút không hoạt động, bạn có thể copy link này: <br> {JoinLink}</p>
    //             </div>"
    //     };

    //     var existingTokens = await _inviteTokenRepository.GetAsync(t => t.Email == toEmail && t.WarehouseId == warehouseId);
    //     foreach (var existing in existingTokens)
    //     {
    //         await _inviteTokenRepository.DeleteAsync(existing.WarehouseId);
    //     }

    //     var inviteToken = new InviteToken
    //     {
    //         Email=toEmail,
    //         Token=token,
    //         WarehouseId=warehouseId,
    //         Expiration = DateTime.UtcNow.AddHours(24),
    //     };

    //     await _inviteTokenRepository.AddAsync(inviteToken);
    //     await SendEmailAsync(emailMessage);
    // }

    public async Task SendEmailAsync(EmailMessageDTO emailMessage)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Stockify", "stockify.support@gmail.com"));
        message.To.Add(new MailboxAddress("", emailMessage.ToEmail));
        message.Subject = emailMessage.Subject;
        message.Body = new TextPart("html") { Text = emailMessage.Body };

        using var client = new SmtpClient();
        await client.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync("stockify.support@gmail.com", "pkzh tkgk qapt xrpr");
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}

