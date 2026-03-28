namespace BackendAPI.BE.BLL.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;
using BackendAPI.BE.API.DTO;
using System.Security.Cryptography;
using BackendAPI.BE.DAL.Interfaces;
using System.Threading.Tasks;
using BackendAPI.BE.DAL.Entities;
using System.Linq;



public class EmailService : IEmailService {

    private readonly IOTPRepository _OTPRepository;
    public EmailService(IOTPRepository OTPRepository) {
        _OTPRepository = OTPRepository;
    }
    public async Task<string> GenerateOtpAsync() {
        int otp= RandomNumberGenerator.GetInt32(100000, 999999);
        return otp.ToString();
    }

    public async Task saveOtpAsync(string email, string otpCode) {
        // Lưu OTP vào cơ sở dữ liệu với thông tin email và thời gian hết hạn
        var OTP = new OTP
        {
            Code = otpCode,
            Email = email,
            CreatedAt = DateTime.UtcNow,
            Expiration = DateTime.UtcNow.AddMinutes(15), // OTP valid for 15 minutes
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
                <p>Mã này có hiệu lực trong <b>5 phút</b>.</p>
                <p>Vui lòng không cung cấp mã này cho bất kỳ ai.</p>
            </div>"
        };
        await saveOtpAsync(toEmail,otpCode);
        await SendEmailAsync(emailMessage);
    }

    public async Task SendConfirmationEmailAsync(string toEmail) 
    {
        var otpCode = await GenerateOtpAsync();

        var emailMessage = new EmailMessageDTO
        {
            ToEmail = toEmail,
            Subject = "Xác nhận tài khoản",
            Body = $@"
            <div style='font-family: sans-serif; text-align: center;'>
                <h3>Mã xác thực của bạn là:</h3>
                <h1 style='color: #007bff; letter-spacing: 5px;'>{otpCode}</h1>
                <p>Mã này có hiệu lực trong <b>5 phút</b>.</p>
                <p>Vui lòng không cung cấp mã này cho bất kỳ ai.</p>
            </div>"
        };
        await saveOtpAsync(toEmail, otpCode);
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
