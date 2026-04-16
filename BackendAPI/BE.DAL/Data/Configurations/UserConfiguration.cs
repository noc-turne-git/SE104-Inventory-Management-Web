namespace BackendAPI.BE.DAL.Data.Configurations;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BCrypt.Net;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    // public int UserId { get; set; } =0 ;
    
    // public string FullName { get; set; } = string.Empty;
    // public string PasswordHash { get; set; } = string.Empty;
    // public string Phone { get; set; } = string.Empty;
    // [Required]
    // [EmailAddress]
    // public string Email { get; set; } = string.Empty;
    // public string Address { get; set; } = string.Empty;
    // public bool IsVerified { get; set; } = false;
    // public string getKey() => UserId.ToString();
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasIndex(u => u.Email).IsUnique();

        builder.HasData(
        new User
        {
            UserId = 1,
            FullName = "Manager kho1, staff kho 2",
            PasswordHash = BCrypt.HashPassword("1"),
            Phone = "0123456789",
            Email = "manager@test.com",
            Address= "123 Main St, City, Country",
            IsVerified = true
        },
        new User
        {
            UserId = 2,
            FullName = "Staff kho1, Manager kho 2",
            PasswordHash = BCrypt.HashPassword("1"),
            Phone = "0123456789",
            Email = "staff@test.com",
            Address= "456 Oak Ave, City, Country",
            IsVerified = false
        },
        new User
        {
            UserId = 3,
            FullName = "Gest",
            PasswordHash = BCrypt.HashPassword("1"),
            Phone = "0123456789",
            Email = "gest@test.com",
            Address= "789 Pine Rd, City, Country",
            IsVerified = false
        }

            

    );
    }
}
