namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class DeliveryItemConfiguration : IEntityTypeConfiguration<DeliveryItem>
{
    public void Configure(EntityTypeBuilder<DeliveryItem> builder)
    {
        builder.HasOne(di => di.DeliveryNote)
            .WithMany(dn => dn.DeliveryItems)
            .HasForeignKey(di => di.NoteId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(di => di.Product)
            .WithMany(p => p.DeliveryItems)
            .HasForeignKey(di => di.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            new DeliveryItem { DeliveryItemId = 1, NoteId = 2, ProductId = 1, Quantity = 10 }
        );
    }
}
