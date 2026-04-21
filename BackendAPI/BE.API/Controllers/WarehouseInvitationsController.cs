namespace BackendAPI.BE.API.Controllers;

using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/invitations")]
public class WarehouseInvitationsController : ControllerBase
{
    private readonly IInvitationReadService _invitations;

    public WarehouseInvitationsController(IInvitationReadService invitations)
    {
        _invitations = invitations;
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.INVITATION_VIEW)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _invitations.GetByWarehouseAsync(warehouseId, cancellationToken);
        return Ok(items);
    }
}

