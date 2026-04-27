namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO;

public interface IInvitationInboxService
{
    Task<IReadOnlyList<ReceivedInvitationDTO>> GetReceivedAsync(int userId, CancellationToken cancellationToken = default);
    Task<bool> RejectAsync(int inviId, CancellationToken cancellationToken = default);
     Task<bool> AcceptAsync(int inviId,int userId, CancellationToken cancellationToken = default);
}

