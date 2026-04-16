namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class Permission : IEntity
{
    public int PermissionId { get; set; }    
    public string PermissionCode { get; set; } = string.Empty;
    
    // Navigation properties
    public ICollection<RolePermission> RolePermissions { get; set; }
    public string getKey() => PermissionId.ToString();
}