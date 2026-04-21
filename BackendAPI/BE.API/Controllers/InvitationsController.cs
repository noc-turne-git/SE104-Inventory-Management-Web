namespace BackendAPI.BE.API.Controllers;

using System.Security.Claims;
using BackendAPI.BE.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/invitations")]
public class InvitationsController : ControllerBase
{
    private readonly IInvitationInboxService _invitations;

    public InvitationsController(IInvitationInboxService invitations)
    {
        _invitations = invitations;
    }

    // Xem các invitation mà user hiện tại nhận được (không phụ thuộc warehouseId trên route).
    [HttpGet("received")]
    public async Task<IActionResult> GetReceived(CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = await _invitations.GetReceivedAsync(userId, cancellationToken);
        return Ok(items);
    }
}

