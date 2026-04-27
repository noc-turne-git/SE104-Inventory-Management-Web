namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.HasDiscriminator<string>("NoteType")
            .HasValue<GoodsReceipt>("GoodsReceipt")
            .HasValue<DeliveryNote>("DeliveryNote")
            .HasValue<DamageNote>("DamageNote")
            .HasValue<InventoryCheckNote>("InventoryCheckNote");

        builder.HasOne(n => n.User)
            .WithMany(u => u.Notes)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(n => n.Warehouse)
            .WithMany()
            .HasForeignKey(n => n.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
