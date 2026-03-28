namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
public interface IEmailService {
    Task<string> GenerateOtpAsync();
    Task SendEmailAsync(EmailMessageDTO emailMessage);
    Task SendResetPasswordEmailAsync(string toEmail);
    Task SendConfirmationEmailAsync(string toEmail);
    Task SendInvitationEmailAsync(string toEmail, string warehouseName);
}