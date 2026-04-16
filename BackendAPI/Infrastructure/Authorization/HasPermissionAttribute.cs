namespace BackendAPI.Infrastructure.Authorization;
using Microsoft.AspNetCore.Authorization;

public class HasPermissionAttribute : AuthorizeAttribute
{
    public string Permission { get; }
    public HasPermissionAttribute(string permission) : base(permission)
    {
        Permission = permission;
    }
}