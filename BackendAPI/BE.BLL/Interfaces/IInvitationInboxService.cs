namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO;

public interface IInvitationInboxService
{
    Task<IReadOnlyList<ReceivedInvitationDTO>> GetReceivedAsync(int userId, CancellationToken cancellationToken = default);
}

