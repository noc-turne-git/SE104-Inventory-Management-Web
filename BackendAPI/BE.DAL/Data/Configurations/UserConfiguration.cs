namespace BackendAPI.BE.DAL.Data.Configurations;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BCrypt.Net;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    private const string SeedPasswordSalt = "$2a$10$7EqJtq98hPqEX7fNZaFWo.";

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
            PasswordHash = BCrypt.HashPassword("1", SeedPasswordSalt),
            Phone = "0123456789",
            Dob = new DateTime(2000, 01, 01, 0, 0, 0, DateTimeKind.Utc),
            Email = "manager@test.com",
            Address= "123 Main St, City, Country",
            IsVerified = true
        },
        new User
        {
            UserId = 2,
            FullName = "Staff kho1, Manager kho 2",
            PasswordHash = BCrypt.HashPassword("1", SeedPasswordSalt),
            Phone = "0123456789",
            Dob = new DateTime(2000, 01, 02, 0, 0, 0, DateTimeKind.Utc),
            Email = "staff@test.com",
            Address= "456 Oak Ave, City, Country",
            IsVerified = false
        },
        new User
        {
            UserId = 3,
            FullName = "Gest",
            PasswordHash = BCrypt.HashPassword("1", SeedPasswordSalt),
            Phone = "0123456789",
            Dob = new DateTime(2000, 01, 03, 0, 0, 0, DateTimeKind.Utc),
            Email = "gest@test.com",
            Address= "789 Pine Rd, City, Country",
            IsVerified = false
        }

            

    );
    }
}
