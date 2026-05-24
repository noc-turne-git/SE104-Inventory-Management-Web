namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class WarehouseStaffConfiguration : IEntityTypeConfiguration<WarehouseStaff>
{
    public void Configure(EntityTypeBuilder<WarehouseStaff> builder)
    {
        builder.HasKey(ws => new { ws.WarehouseId, ws.UserId });

        builder.HasOne(ws => ws.Warehouse)
            .WithMany(w => w.WarehouseStaffs)
            .HasForeignKey(ws => ws.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(ws => ws.User)
            .WithMany(u => u.WarehouseStaffs)
            .HasForeignKey(ws => ws.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(ws => ws.Role) 
            .WithMany(r => r.WarehouseStaffs)
            .HasForeignKey(ws => ws.RoleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(SeedData.WarehouseStaffs);
    }
}
