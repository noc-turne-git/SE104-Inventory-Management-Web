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

        builder.HasData(SeedData.InfractionTickets);
    }
}
