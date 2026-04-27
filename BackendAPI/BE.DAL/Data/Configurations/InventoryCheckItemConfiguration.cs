namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class InventoryCheckItemConfiguration : IEntityTypeConfiguration<InventoryCheckItem>
{
    public void Configure(EntityTypeBuilder<InventoryCheckItem> builder)
    {
        builder.HasOne(i => i.InventoryCheckNote)
            .WithMany(n => n.InventoryCheckItems)
            .HasForeignKey(i => i.NoteId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(i => i.Product)
            .WithMany()
            .HasForeignKey(i => i.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            new InventoryCheckItem
            {
                InventoryCheckItemId = 1,
                NoteId = 4,
                ProductId = 1,
                StockQuantity = 120,
                Reason = "Monthly routine stock take"
            }
        );
    }
}

