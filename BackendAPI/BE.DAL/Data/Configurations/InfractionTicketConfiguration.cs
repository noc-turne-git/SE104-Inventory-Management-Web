namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class InfractionTicketConfiguration : IEntityTypeConfiguration<InfractionTicket>
{
    public void Configure(EntityTypeBuilder<InfractionTicket> builder)
    {
        builder.HasOne(i => i.User)
            .WithMany(u => u.InfractionTickets)
            .HasForeignKey(i => i.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(i => i.Warehouse)
            .WithMany(w => w.InfractionTickets)
            .HasForeignKey(i => i.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            new InfractionTicket
            {
                InfractionTicketId = 1,
                WarehouseId = 1,
                UserId = 2,
                Date = new DateTime(2026, 01, 10, 0, 0, 0, DateTimeKind.Utc),
                Description = "Late to shift",
                Penalty = 50000
            },
            new InfractionTicket
            {
                InfractionTicketId = 2,
                WarehouseId = 2,
                UserId = 1,
                Date = new DateTime(2026, 01, 11, 0, 0, 0, DateTimeKind.Utc),
                Description = "Missing checklist",
                Penalty = 30000
            }
        );
    }
}
