namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
public interface IEmailService {
    Task<string> GenerateOtpAsync();
    Task SendEmailAsync(EmailMessageDTO emailMessage);
    Task SendResetPasswordEmailAsync(string toEmail);
    Task SendConfirmationEmailAsync(string toEmail, int UserId);
    //Task SendInvitationEmailAsync(string toEmail, int warehouseId);
}