namespace BackendAPI.BE.DAL.Data.Configurations;

using BackendAPI.BE.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ReceiptItemConfiguration : IEntityTypeConfiguration<ReceiptItem>
{
    public void Configure(EntityTypeBuilder<ReceiptItem> builder)
    {
        builder.HasOne(ri => ri.GoodReceipt)
            .WithMany(gr => gr.ReceiptItems)
            .HasForeignKey(ri => ri.NoteId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(ri => ri.Product)
            .WithMany(p => p.ReceiptItems)
            .HasForeignKey(ri => ri.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasData(
            new ReceiptItem { ReceiptItemId = 1, NoteId = 1, ProductId = 1, OrderedQuantity = 60, Quantity = 60, DefectiveQuantity = 2 },
            new ReceiptItem { ReceiptItemId = 2, NoteId = 1, ProductId = 1, OrderedQuantity = 40, Quantity = 40, DefectiveQuantity = 0 }
        );
    }
}
