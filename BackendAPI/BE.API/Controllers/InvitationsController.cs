namespace BackendAPI.BE.API.Controllers;

using System.Security.Claims; //Dùng để lấy thông tin người dùng từ JWT Token.
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using MailKit; //Thư viện xử lý email.
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BackendAPI.BE.API.DTO;

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
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!); // ClaimTypes.NameIdentifier là userID
        var items = await _invitations.GetReceivedAsync(userId, cancellationToken); //CancellationToken cancellationToken : Cho phép hủy tác vụ nếu request bị ngắt.
        return Ok(items);
    }

    [HttpPost("reject")]
    public async Task<IActionResult> Reject(InviteDTO invi,CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var res = await _invitations.RejectAsync(invi.InvitationId, cancellationToken);
        if(res== false )  return BadRequest(new { Success = false, Message = "Failed to reject." });
        return Ok(new
        {
            Success = true,
            Message = "Reject successfully."
        });
    }

    [HttpPost("accept")]
    public async Task<IActionResult> Accept(InviteDTO invi,CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var res = await _invitations.AcceptAsync(invi.InvitationId,userId, cancellationToken);
        if(res== false )  return BadRequest(new { Success = false, Message = "Failed to accept." });
        return Ok(new
        {
            Success = true,
            Message = "accept successfully."
        });
    }
}

