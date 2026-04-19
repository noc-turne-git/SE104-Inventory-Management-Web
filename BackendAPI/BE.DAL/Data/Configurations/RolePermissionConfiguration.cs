namespace BackendAPI.BE.DAL.Data.Configurations;
using BackendAPI.BE.DAL.Entities;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RolePermissionConfiguration : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        builder.HasKey(rp => new { rp.RoleId, rp.PermissionId });

        builder.HasOne(rp => rp.Role)
            .WithMany(r => r.RolePermissions)
            .HasForeignKey(rp => rp.RoleId);

        builder.HasOne(rp => rp.Permission)
            .WithMany(p => p.RolePermissions)
            .HasForeignKey(rp => rp.PermissionId);

        // Seed data
        builder.HasData(
            new RolePermission { RoleId = 1, PermissionId = 1 }, 
            new RolePermission { RoleId = 1, PermissionId = 2 },
            new RolePermission { RoleId = 1, PermissionId = 3 },
            new RolePermission { RoleId = 1, PermissionId = 4 },
            new RolePermission { RoleId = 1, PermissionId = 5 },
            new RolePermission { RoleId = 1, PermissionId = 6 },
            new RolePermission { RoleId = 1, PermissionId = 7 },
            new RolePermission { RoleId = 1, PermissionId = 8 },
            new RolePermission { RoleId = 1, PermissionId = 9 },
            new RolePermission { RoleId = 1, PermissionId = 10 },
            new RolePermission { RoleId = 1, PermissionId = 11 },
            new RolePermission { RoleId = 1, PermissionId = 12 },
            new RolePermission { RoleId = 1, PermissionId = 13 },
            new RolePermission { RoleId = 1, PermissionId = 14 },
            new RolePermission { RoleId = 1, PermissionId = 15 },
            new RolePermission { RoleId = 1, PermissionId = 16 },
            new RolePermission { RoleId = 1, PermissionId = 17 },
            new RolePermission { RoleId = 1, PermissionId = 18 },
            //new RolePermission { RoleId = 1, PermissionId = 19 },
            new RolePermission { RoleId = 1, PermissionId = 20 },
            new RolePermission { RoleId = 1, PermissionId = 21 },
            new RolePermission { RoleId = 2, PermissionId = 1 },
            new RolePermission { RoleId = 2, PermissionId = 2 },
            new RolePermission { RoleId = 2, PermissionId = 3 },
            new RolePermission { RoleId = 2, PermissionId = 4 },
            new RolePermission { RoleId = 2, PermissionId = 5 },
            new RolePermission { RoleId = 2, PermissionId = 7 },
            new RolePermission { RoleId = 2, PermissionId = 8 },
            new RolePermission { RoleId = 2, PermissionId = 9 },
            new RolePermission { RoleId = 2, PermissionId = 10 },
            new RolePermission { RoleId = 2, PermissionId = 11 },
            new RolePermission { RoleId = 2, PermissionId = 12 },
            new RolePermission { RoleId = 2, PermissionId = 13 },
            new RolePermission { RoleId = 2, PermissionId = 14 },
            new RolePermission { RoleId = 2, PermissionId = 15 },
            new RolePermission { RoleId = 2, PermissionId = 16 },
            new RolePermission { RoleId = 2, PermissionId = 17 },
            new RolePermission { RoleId = 2, PermissionId = 18 },
            new RolePermission { RoleId = 2, PermissionId = 20 },
            new RolePermission { RoleId = 2, PermissionId = 21 },
            new RolePermission { RoleId = 3, PermissionId = 12 },
            new RolePermission { RoleId = 3, PermissionId = 13 },
            new RolePermission { RoleId = 3, PermissionId = 14 },
            new RolePermission { RoleId = 3, PermissionId = 15 },
            new RolePermission { RoleId = 3, PermissionId = 16 },
            new RolePermission { RoleId = 3, PermissionId = 17 },
            new RolePermission { RoleId = 3, PermissionId = 18 },
            new RolePermission { RoleId = 3, PermissionId = 19 },
            new RolePermission { RoleId = 3, PermissionId = 20 },
            new RolePermission { RoleId = 3, PermissionId = 21 }
        );
    }
}