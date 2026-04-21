namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ShiftConfiguration : IEntityTypeConfiguration<Shift>
{
    public void Configure(EntityTypeBuilder<Shift> builder)
    {
        builder.HasOne(s => s.User)
            .WithMany(u => u.Shifts)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(s => s.Warehouse)
            .WithMany(w => w.Shifts)
            .HasForeignKey(s => s.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            new Shift
            {
                ShiftId = 1,
                WarehouseId = 1,
                UserId = 2,
                StartTime = new DateTime(2026, 01, 05, 08, 00, 00, DateTimeKind.Utc),
                EndTime = new DateTime(2026, 01, 05, 16, 00, 00, DateTimeKind.Utc),
                Duty = "Receive goods",
                Note = "Morning shift"
            },
            new Shift
            {
                ShiftId = 2,
                WarehouseId = 2,
                UserId = 1,
                StartTime = new DateTime(2026, 01, 06, 08, 00, 00, DateTimeKind.Utc),
                EndTime = new DateTime(2026, 01, 06, 16, 00, 00, DateTimeKind.Utc),
                Duty = "Inventory check",
                Note = "Regular shift"
            }
        );
    }
}
