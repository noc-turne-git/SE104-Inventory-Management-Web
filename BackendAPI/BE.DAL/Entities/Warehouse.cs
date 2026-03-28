namespace BackendAPI.BE.DAL.Entities;

public class Organization
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int CreatorId { get; set; } 
    
    // Navigation properties
    public User Creator { get; set; } = null!;
    public ICollection<OrganizationMember> OrganizationMembers { get; set; } = null!;
    public ICollection<Product> Products { get; set; } = null!;
    public ICollection<Supplier> Suppliers { get; set; } = null!;
    public ICollection<Shift> Shifts { get; set; } = null!;
}