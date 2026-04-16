namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
public class RolePermission : IEntity
{
    public int RoleId { get; set; }
    public int PermissionId { get; set; }
    
    public string getKey() => $"{RoleId}:{PermissionId}";

    // Navigation properties
    public Role Role { get; set; } = null!;
    public Permission Permission { get; set; } = null!;
}