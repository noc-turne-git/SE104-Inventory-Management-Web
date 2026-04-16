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
            .HasValue<DamageNote>("DamageNote");

        builder.HasOne(n => n.User)
            .WithMany(u => u.Notes)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(n => n.Warehouse)
            .WithMany()
            .HasForeignKey(n => n.WarehouseId)
            .OnDelete(DeleteBehavior.Restrict);

        var goodsReceipt = new GoodsReceipt
        {
            NoteId = 1,
            WarehouseId = 1,
            UserId = 1,
            Date = new DateTime(2026, 01, 07, 0, 0, 0, DateTimeKind.Utc),
            type = "GoodsReceipt",
            qualityCheckStatus = "PASSED",
            SupplierId = 1,
            StockQuantity = 100,
            DefectiveQuantity = 2,
            Status = StatusCode.APPROVED
        };
        ((Note)goodsReceipt).Date = goodsReceipt.Date;

        var deliveryNote = new DeliveryNote
        {
            NoteId = 2,
            WarehouseId = 1,
            UserId = 2,
            Date = new DateTime(2026, 01, 08, 0, 0, 0, DateTimeKind.Utc),
            type = "DeliveryNote",
            Destination = "Store A",
            Status = StatusCode.PENDING
        };
        ((Note)deliveryNote).Date = deliveryNote.Date;
        ((Note)deliveryNote).Status = StatusCode.PENDING;

        var damageNote = new DamageNote
        {
            NoteId = 3,
            WarehouseId = 2,
            UserId = 2,
            Date = new DateTime(2026, 01, 09, 0, 0, 0, DateTimeKind.Utc),
            type = "DamageNote",
            Description = "Damaged packaging",
            Status = StatusCode.REJECTED
        };
        ((Note)damageNote).Date = damageNote.Date;

        builder.HasData(goodsReceipt, deliveryNote, damageNote);
    }
}
