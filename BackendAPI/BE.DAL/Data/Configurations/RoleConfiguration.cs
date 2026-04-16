namespace BackendAPI.BE.DAL.Data.Configurations;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BackendAPI.BE.DAL.Constants;
public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasMany(r => r.RolePermissions)
         .WithOne(rp => rp.Role)
         .HasForeignKey(rp => rp.RoleId)
         .OnDelete(DeleteBehavior.Cascade);

        builder.HasData(
            new Role { RoleId = 1, RoleName = RoleCode.OWNER },
            new Role { RoleId = 2, RoleName = RoleCode.MANAGER },
            new Role { RoleId = 3, RoleName = RoleCode.STAFF }
        );
    }
}
        